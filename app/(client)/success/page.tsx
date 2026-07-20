"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import useStore from "@/store"
import { useUser } from "@clerk/nextjs"
import { ArrowRight, Check, Copy, Home, Mail, Package, ShoppingBag, Truck } from "lucide-react"
import { motion, spring } from "motion/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect } from "react"
import toast from "react-hot-toast"

const nextSteps = [
  {
    icon: Check,
    title: "Order confirmed",
    description: "Your payment was successful.",
    status: "complete" as const,
  },
  {
    icon: Package,
    title: "Processing",
    description: "We're preparing your items for shipment.",
    status: "current" as const,
  },
  {
    icon: Truck,
    title: "Shipped",
    description: "You'll receive tracking details by email.",
    status: "upcoming" as const,
  },
]

function SuccessContent() {
  const { user } = useUser()
  const { resetCart } = useStore()
  const searchParams = useSearchParams()
  const session_id = searchParams.get("session_id")
  const orderNumber = searchParams.get("orderNumber")
  const firstName = user?.firstName ?? "there"
  const userEmail = user?.emailAddresses[0]?.emailAddress

  useEffect(() => {
    if (session_id) {
      resetCart()
    }
  }, [session_id, resetCart])

  const handleCopyOrderNumber = async () => {
    if (!orderNumber) return

    try {
      await navigator.clipboard.writeText(orderNumber)
      toast.success("Order number copied!")
    } catch {
      toast.error("Couldn't copy order number")
    }
  }

  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-shop_light_bg via-white to-shop_light_bg/60" />
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-shop_light_green/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-shop_orange/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-xl"
      >
        <div className="overflow-hidden rounded-2xl border border-shop_light_green/25 bg-white shadow-xl shadow-shop_dark_green/5">
          <div className="h-1.5 bg-linear-to-r from-shop_dark_green via-shop_light_green to-shop_orange" />

          <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: spring, stiffness: 200 }}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-shop_dark_green shadow-lg shadow-shop_dark_green/20"
              >
                <Check className="h-10 w-10 text-white" strokeWidth={2.5} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-5 space-y-2"
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-shop_light_bg px-3 py-1 text-xs font-semibold uppercase tracking-wide text-shop_dark_green">
                  <Check className="h-3.5 w-3.5 text-shop_light_green" />
                  Payment successful
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-darkColor md:text-3xl">
                  Thanks for your order, {firstName}!
                </h1>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-lightColor md:text-base">
                  We&apos;re getting your order ready. You&apos;ll hear from us as soon as it ships.
                </p>
              </motion.div>
            </div>

            {orderNumber && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="rounded-xl border border-shop_light_green/20 bg-shop_light_bg/40 p-4"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-shop_dark_green">
                  Order number
                </p>
                <div className="mt-2 flex items-center justify-between gap-3">
                  <span className="truncate font-mono text-sm font-semibold text-darkColor md:text-base">
                    {orderNumber}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopyOrderNumber}
                    className="shrink-0 border-shop_light_green/30 hover:border-shop_light_green hover:bg-white"
                    aria-label="Copy order number"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copy
                  </Button>
                </div>
              </motion.div>
            )}

            {userEmail && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="flex items-start gap-3 rounded-xl border border-shop_light_green/15 bg-white p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-shop_light_bg">
                  <Mail className="h-4 w-4 text-shop_dark_green" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-semibold text-darkColor">Confirmation email sent</p>
                  <p className="mt-0.5 text-sm text-lightColor">
                    We sent order details to{" "}
                    <span className="font-medium text-darkColor">{userEmail}</span>
                  </p>
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="space-y-3 rounded-xl border border-shop_light_green/15 p-4"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-shop_dark_green">
                What happens next
              </p>
              <div className="space-y-4">
                {nextSteps.map((step, index) => {
                  const Icon = step.icon
                  const isComplete = step.status === "complete"
                  const isCurrent = step.status === "current"

                  return (
                    <div key={step.title} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-full ${isComplete
                              ? "bg-shop_dark_green text-white"
                              : isCurrent
                                ? "bg-shop_light_green/15 text-shop_dark_green ring-2 ring-shop_light_green/30"
                                : "bg-shop_light_bg text-lightColor"
                            }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        {index < nextSteps.length - 1 && (
                          <div
                            className={`mt-1 h-full min-h-6 w-px ${isComplete ? "bg-shop_light_green" : "bg-shop_light_green/20"
                              }`}
                          />
                        )}
                      </div>
                      <div className="pb-1 pt-0.5 text-left">
                        <p
                          className={`text-sm font-semibold ${isComplete || isCurrent ? "text-darkColor" : "text-lightColor"
                            }`}
                        >
                          {step.title}
                        </p>
                        <p className="text-sm text-lightColor">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="space-y-3"
            >
              <Link
                href="/shop"
                className={cn(buttonVariants({ size: "lg" }), "h-11 w-full text-base")}
              >
                Continue shopping
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>

              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 border-shop_light_green/30 text-base hover:border-shop_light_green hover:bg-shop_light_bg"
                  )}
                >
                  <Home className="h-4 w-4" />
                  Home
                </Link>
                <Link
                  href="/wishlist"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-11 border-shop_light_green/30 text-base hover:border-shop_light_green hover:bg-shop_light_bg"
                  )}
                >
                  <ShoppingBag className="h-4 w-4" />
                  Wishlist
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

const SuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[70vh] items-center justify-center">
          <p className="text-sm text-lightColor">Loading your order…</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}

export default SuccessPage