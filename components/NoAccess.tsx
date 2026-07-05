"use client"

import Link from "next/link"
import { SignInButton } from "@clerk/nextjs"
import { motion } from "motion/react"
import { ArrowRight, ShoppingCart, Sparkles } from "lucide-react"
import Logo from "./Logo"
import { Button } from "./ui/button"

const NoAccess = ({
  details = "Sign in to view your cart items and checkout. Don't miss out on your favorite products!",
}: {
  details?: string
}) => {
  return (
    <div className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4 py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-shop_light_bg via-white to-shop_light_bg/60" />
      <div className="pointer-events-none absolute -left-20 top-10 h-56 w-56 rounded-full bg-shop_light_green/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-shop_orange/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-lg"
      >
        <div className="overflow-hidden rounded-2xl border border-shop_light_green/25 bg-white shadow-xl shadow-shop_dark_green/5">
          <div className="h-1.5 bg-linear-to-r from-shop_dark_green via-shop_light_green to-shop_orange" />

          <div className="space-y-6 px-6 py-8 md:px-10 md:py-10">
            <div className="flex flex-col items-center text-center">
              <Logo />

              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-shop_light_bg ring-8 ring-shop_light_green/10"
              >
                <ShoppingCart className="h-7 w-7 text-shop_dark_green" strokeWidth={1.75} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="mt-5 space-y-2"
              >
                <div className="inline-flex items-center gap-1.5 rounded-full bg-shop_light_bg px-3 py-1 text-xs font-semibold uppercase tracking-wide text-shop_dark_green">
                  <Sparkles className="h-3.5 w-3.5 text-shop_orange" />
                  Members only
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-darkColor md:text-3xl">
                  Welcome back to Shopora
                </h2>
                <p className="max-w-sm text-sm leading-relaxed text-lightColor md:text-base">
                  {details}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="space-y-3"
            >
              <SignInButton mode="modal">
                <Button size="lg" className="h-11 w-full text-base">
                  Sign in to your account
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </SignInButton>

              <div className="relative py-1">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-shop_light_green/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-wider">
                  <span className="bg-white px-3 text-lightColor">or</span>
                </div>
              </div>

              <SignInButton mode="modal">
                <Button variant="outline" size="lg" className="h-11 w-full border-shop_light_green/30 text-base hover:border-shop_light_green hover:bg-shop_light_bg">
                  Create a free account
                </Button>
              </SignInButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="flex flex-col items-center gap-3 border-t border-shop_light_green/15 pt-5 text-center"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-1 text-sm font-semibold text-shop_dark_green transition-colors hover:text-shop_light_green hoverEffect"
              >
                Continue shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="text-xs text-lightColor">
                New here? Join Shopora for faster checkout and order tracking.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default NoAccess
