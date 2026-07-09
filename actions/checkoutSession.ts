"use server"

import stripe from "@/lib/stripe";
import { urlFor } from "@/sanity/lib/image";
import { CartItem } from "@/store";
import { headers } from "next/headers";
import Stripe from "stripe";

export interface CheckoutAddress {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
}

export interface Metadata {
    orderNumber: string;
    customerName: string;
    customerEmail: string;
    clerkUserId?: string;
    address?: CheckoutAddress | null;
}
export interface GroupedCartItems {
    product: CartItem['product']
    quantity: number
}

async function getBaseUrl() {
    const configuredBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.trim();

    if (configuredBaseUrl) {
        return configuredBaseUrl.startsWith("http://") || configuredBaseUrl.startsWith("https://")
            ? configuredBaseUrl.replace(/\/$/, "")
            : `https://${configuredBaseUrl.replace(/\/$/, "")}`;
    }

    const headersList = await headers();
    const host = headersList.get("x-forwarded-host") ?? headersList.get("host");

    if (host) {
        const protocol = headersList.get("x-forwarded-proto") ?? "https";
        return `${protocol}://${host}`;
    }

    return "http://localhost:3000";
}

export async function createCheckoutSession(items: GroupedCartItems[], metadata: Metadata) {
    try {
        const baseUrl = await getBaseUrl();
        //Retrive existing customer or create new one
        const customers = await stripe.customers.list({
            email: metadata.customerEmail,
            limit: 1
        })
        const customerId = customers?.data?.length > 0 ? customers.data[0].id : ""

        const sessionPayload: Stripe.Checkout.SessionCreateParams = {
            metadata: {
                orderNumber: metadata.orderNumber,
                customerName: metadata.customerName,
                customerEmail: metadata.customerEmail,
                clerkUserId: metadata.clerkUserId ?? null,
                address: metadata.address ? JSON.stringify(metadata.address) : null,
            },
            mode: "payment",
            allow_promotion_codes: true,
            payment_method_types: ['card'],
            invoice_creation: { enabled: true },
            success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
            cancel_url: `${baseUrl}/cart`,
            line_items: items?.map((item) => ({
                price_data: {
                    currency: "USD",
                    unit_amount: Math.round(item?.product?.price! * 100),
                    product_data: {
                        name: item?.product?.name || "Unknown Product",
                        description: item?.product?.description,
                        metadata: { id: item?.product?._id },
                        images: item?.product?.images && item?.product?.images?.length > 0
                            ? [urlFor(item?.product?.images[0]).url()]
                            : undefined,
                    },
                },
                quantity: item?.quantity,
            }))
        };
        if (customerId) {
            sessionPayload.customer = customerId;
        } else {
            sessionPayload.customer_email = metadata.customerEmail
        }

        const session = await stripe.checkout.sessions.create(sessionPayload)
        return session.url
    } catch (error) {
        console.error("Error creating checkout session:", error)
        throw error;
    }
}