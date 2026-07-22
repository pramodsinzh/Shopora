"use client"

import useStore from "@/store"
import { ArrowRight, Heart, HeartCrack, HeartHandshake, HeartOff, X } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Container from "../Container"
import { Product } from "@/sanity.types"
import toast from "react-hot-toast"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import PriceFormatter from "../PriceFormatter" 
import { Button } from "../ui/button"
import AddToCartButton from "../cart/AddToCartButton"

const WishListProducts = () => {
    const [visibleProducts, setVisibleProducts] = useState(7)
    const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore()

    const loadMore = () => {
        setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length))
    }
    const handleResetWishlist = () => {
        const confirm = window.confirm("Are you sure you want to reset your wishlist?")
        if(confirm){
            resetFavorite()
            toast.success("Wishlist cleared! Ready to start fresh.")
        }
    }
    return (
        <Container>
            {favoriteProduct?.length > 0 ? (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead className="border-b">
                                <tr className="bg-black/5">
                                    <th className="p-2 text-left">Image</th>
                                    <th className="p-2 text-left hidden md:table-cell">Category</th>
                                    <th className="p-2 text-left hidden md:table-cell">Type</th>
                                    <th className="p-2 text-left hidden md:table-cell">Status</th>
                                    <th className="p-2 text-left ">Price</th>
                                    <th className="p-2 md:text-left text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favoriteProduct?.slice(0, visibleProducts)?.map((product: Product) => (
                                    <tr key={product?._id} className="border-b">
                                        <td className="px-2 py-4 flex items-center gap-2">
                                            <X onClick={() => {
                                                removeFromFavorite(product?._id);
                                                toast.success("Product removed from wishlist.")
                                            }}
                                                size={18}
                                                className="hover:text-red-600 hover:cursor-pointer hoverEffect"
                                            />
                                            {product?.images && (
                                                <Link className="border rounded-md group hidden md:inline-flex" href={`/product/${product?.slug?.current}`}>
                                                    <Image
                                                        src={urlFor(product?.images[0]).url()}
                                                        alt="product image"
                                                        width={50}
                                                        height={50}
                                                        className="object-contain rounded-md group-hover:scale-105 hoverEffect h-20 w-20"
                                                    />
                                                </Link>
                                            )}
                                            <p className="line-clamp-1">{product?.name}</p>
                                        </td>
                                        <td className="p-2 capitalize hidden md:table-cell">
                                            {product?.categories && (
                                                <p className="uppercase line-clamp-1 text-xs font-medium">
                                                    {product.categories.map((cat) => cat).join(", ")}
                                                </p>
                                            )}
                                        </td>
                                        <td className="p-2 capitalize hidden md:table-cell text-sm">
                                            {product?.varient}
                                        </td>
                                        <td className={`p-2 w-24 ${(product?.stock as number) > 0 ? "text-green-700" : "text-red-700"
                                            } font-medium text-sm hidden md:table-cell`}>
                                            {(product?.stock as number) > 0 ? "In stock" : "Out of stock"}
                                        </td>
                                        <td className="p-2">
                                            <PriceFormatter amount={product.price} />
                                        </td>
                                        <td className="p-2">
                                            <AddToCartButton product={product} className="w-full" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center gap-2">
                        {visibleProducts < favoriteProduct?.length && (
                            <div className="my-5">
                                <Button variant='outline' onClick={loadMore}>Load more</Button>
                            </div>
                        )}
                        {visibleProducts > 10 && (
                            <div className="my-5">
                                <Button variant='outline' onClick={() => setVisibleProducts(10)}>Load less</Button>
                            </div>
                        )}
                    </div>
                    {favoriteProduct?.length > 0 && (
                        <Button onClick={handleResetWishlist} className='my-5 font-semibold bg-red-600 text-white hover:scale-95 hover:bg-red-600 hoverEffect' variant='destructive' size='lg'>Reset Wishlist</Button>
                    )}
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