import { Metadata } from "@/actions/checkoutSession";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text()
    const headerList = await headers()

    const sign = headerList.get("stripe-signature")
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

    if (event.type === 'checkout.session.completed') {
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
}
async function createOrderInSanity(session: Stripe.Checkout.Session, invoice: Stripe.Invoice | null) {
    const { id, amount_total, currency, metadata, payment_intent, total_details } = session
    const { orderNumber, customerName, customerEmail, clerkUserId, address } = metadata as unknown as Metadata & { address: string }
    const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(id, { expand: ["data.price.product"] })

    //Create sanity product refrences and prepare stock updates
    const sanityProducts = []
    const stockUpdates = []

    for (const item of lineItemsWithProduct.data) {
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
}