import { Metadata } from "@/actions/checkoutSession";
import stripe from "@/lib/stripe";
import { backendClient } from "@/sanity/lib/backendClient";
import { NextRequest, NextResponse } from "next/server";
import { _isType } from "sanity";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const buf = await req.arrayBuffer()
    const body = Buffer.from(buf)


    // Prefer the raw request headers; fall back to next/headers if necessary
    const sign = req.headers.get("stripe-signature") || (await (await import("next/headers")).headers()).get("stripe-signature")
    
    if (!sign) {
        return NextResponse.json(
            { error: "No signature found for stripe!" },
            { status: 400 }
        )
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        return NextResponse.json(
            { error: "Stripe webhook secret is not set!" },
            { status: 400 }
        )
    }
    let event: Stripe.Event
    try {
        event = stripe.webhooks.constructEvent(body, sign, webhookSecret)
    } catch (error) {
        console.error("Webhook signature verification failed:", error)

        return NextResponse.json(
            { error: `Webhook Error: ${error}` },
            { status: 400 }
        )
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;
        const invoice = session.invoice ? await stripe.invoices.retrieve(session.invoice as string) : null;

        try {
            await createOrderInSanity(session, invoice)
        } catch (error) {
            console.error("Error creating order in sanity:", error)

            return NextResponse.json(
                { error: `Error creating order: ${error}` },
                { status: 400 }
            )
        }
    }
    // Acknowledge receipt of the event
    return NextResponse.json({ received: true }, { status: 200 })
}
async function createOrderInSanity(session: Stripe.Checkout.Session, invoice: Stripe.Invoice | null) {
    const { id, amount_total, currency, metadata, payment_intent, total_details } = session
    const safeMetadata = (metadata ?? {}) as Partial<Metadata> & { address?: string }
    const orderNumber = safeMetadata.orderNumber ?? `order-${id}`
    const customerName = safeMetadata.customerName ?? "Guest"
    const customerEmail = safeMetadata.customerEmail ?? ""
    const clerkUserId = safeMetadata.clerkUserId ?? null
    const address = safeMetadata.address

    let parsedAddress = null
    try {
        parsedAddress = address ? JSON.parse(address) : null
    } catch (error) {
        console.warn("Could not parse checkout address from metadata:", error)
    }

    let checkoutSessionForItems = session
    try {
        checkoutSessionForItems = await stripe.checkout.sessions.retrieve(id, {
            expand: ["line_items.data.price.product"],
        })
    } catch (error) {
        console.warn(`Could not retrieve checkout session ${id} for line items; continuing with event payload.`, error)
    }

    const lineItemsWithProduct = checkoutSessionForItems?.line_items?.data ?? []

    //Create sanity product references and prepare stock updates
    const sanityProducts = []
    const stockUpdates = []

    for (const item of lineItemsWithProduct) {
        const productId = (item.price?.product as Stripe.Product)?.metadata?.id;
        const quantity = item?.quantity || 0

        if (!productId) continue;

        sanityProducts.push({
            _key: crypto.randomUUID(),
            product: {
                _type: "reference",
                _ref: productId
            }, quantity,
        });
        stockUpdates.push({ productId, quantity })
    }

    if (sanityProducts.length === 0) {
        console.warn(`No line items found for checkout session ${id}; creating order without product references.`)
    }

    //create order in sanity

    const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId: id,
        stripePaymentIntentId: payment_intent,
        customerName,
        stripeCustomerId: customerEmail || id,
        clerkUserId: clerkUserId ?? undefined,
        email: customerEmail,
        currency,
        amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
        products: sanityProducts,
        totalPrice: amount_total ? amount_total / 100 : 0,
        status: "paid",
        orderDate: new Date().toISOString(),
        invoice: invoice ? {
            id: invoice.id,
            number: invoice.number,
            hosted_invoice_url: invoice.hosted_invoice_url
        } : null,
        address: parsedAddress ? {
            state: parsedAddress.state,
            zip: parsedAddress.zip,
            city: parsedAddress.city,
            address: parsedAddress.address,
            name: parsedAddress.name
        } : null
    })

    //update stock level in sanity
    await updateStockLevens(stockUpdates);
    return order;
}
//Function to update stock levels

async function updateStockLevens(stockUpdates: { productId: string; quantity: number }[]) {
    for (const { productId, quantity } of stockUpdates) {
        try {
            //Fetch current stock
            const product = await backendClient.getDocument(productId)

            if (!product || typeof product.stock !== "number") {
                console.warn(`Product with id ${productId} not found or stock is invalid.`);
                continue;
            }
            const newStock = Math.max(product.stock - quantity, 0); //Ensure stock doesn't go negative

            // Update stock in sanity
            await backendClient.patch(productId).set({ stock: newStock }).commit();
        } catch (error) {
            console.error(`Failed to update stock for product ${productId}:`, error)
        }
    }
}
