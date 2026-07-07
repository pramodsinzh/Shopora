"use client"

import useStore from "@/store"
import { ArrowRight, Heart, HeartCrack, HeartHandshake, HeartOff } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Container from "./Container"

const WishListProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(7)
    const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore()

    const loadMore = () => {
        setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length))
    }
    return (
        <Container>
            {favoriteProduct?.length > 0 ? (
                <>
                    <p>prod</p>
                </>
            ) : (
                <div className="flex min-h-[420px] items-center justify-center px-4 py-10">
                    <div className="w-full max-w-md rounded-[28px] border border-border/70 bg-white/90 p-8 text-center shadow-[0_20px_70px_-25px_rgba(15,23,42,0.25)] backdrop-blur-sm">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-shop_light_green/15 text-shop_dark_green animate-bounce">
                            <HeartCrack className="h-8 w-8" strokeWidth={1.5} />
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                                Your wishlist is empty!
                            </h2>
                            <p className="text-sm leading-6 text-muted-foreground">
                                Save the products you love here and come back anytime to pick up where you left off.
                            </p>
                        </div>
                        <Link
                            href="/shop"
                            className="group mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-shop_dark_green px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-shop_dark_green/70 hoverEffect"
                        >
                            Continue shopping
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default WishListProducts