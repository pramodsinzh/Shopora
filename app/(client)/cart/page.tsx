"use client"

import AddToWishListButton from "@/components/AddToWishListButton"
import Container from "@/components/Container"
import EmptyCart from "@/components/EmptyCart"
import NoAccess from "@/components/NoAccess"
import PriceFormatter from "@/components/PriceFormatter"
import QuantityButtons from "@/components/QuantityButtons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { SubTitle } from "@/components/ui/text"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Address } from "@/sanity.types"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import useStore from "@/store"
import { useAuth, useUser } from "@clerk/nextjs"
import { ShoppingBag, Trash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"


const CartPage = () => {

    const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } = useStore()
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false)
    const groupedItems = useStore((state) => state.getGroupedItems())
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    const [addresses, setAddresses] = useState<Address[] | null>(null)
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

    const fetchAddresses = async () => {
        setLoading(true)
        try {
            const query = `*[_type == "address"] | order(publishedAt desc)`;
            const data = await client.fetch(query)
            setAddresses(data)

            const defaultAddress = data.find((addr: Address) => addr.default)
            if (defaultAddress) {
                setSelectedAddress(defaultAddress)
            } else if (data.length > 0) {
                setSelectedAddress(data[0])
            }
        } catch (error) {
            console.error("Address fetching error:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchAddresses()
    }, [])

    const handleClearCart = () => {
        const confirm = window.confirm("Are you sure you want to clear your cart?");
        if (confirm) {
            resetCart()
            toast.success("Your cart has been cleared!")
        }
    }
    const handleDeleteCartProduct = (productId: string) => {
        const confirm = window.confirm("Are you sure you want to remove this product?");
        if (confirm) {
            deleteCartProduct(productId)  // Pass the product ID
            toast.success("Product removed from cart.")
        }
    }

    return (
        <div className="bg-gray-50 pb-52 md:pb-10">
            {isSignedIn ? (
                <Container>
                    {groupedItems?.length ? (
                        <>
                            <div className="flex items-center gap-2 py-4">
                                <ShoppingBag className="text-darkColor" />
                                <SubTitle className="text-xl font-bold">Shopping Cart</SubTitle>
                            </div>
                            <div className="grid lg:grid-cols-3 md:gap-8">
                                <div className="lg:col-span-2 rounded-lg">
                                    <div className="border bg-white rounded-md">
                                        {groupedItems?.map(({ product }) => {
                                            const itemCount = getItemCount(product?._id)
                                            return (
                                                <div className="border-b p-2.5 last:border-b-0 flex items-center justify-between" key={product?._id}>
                                                    <div className="flex flex-1 items-start gap-2">
                                                        {product?.images && (
                                                            <Link className="border p-0.5 md:p-1 mr-2 rounded-md overflow-hidden group" href={`/product/${product?.slug?.current}`} >
                                                                <Image
                                                                    src={urlFor(product?.images[0]).url()}
                                                                    alt="productImage"
                                                                    width={500}
                                                                    height={500}
                                                                    loading="lazy"
                                                                    className="w-32 h-32  object-cover group-hover:scale-105 hoverEffect"
                                                                />
                                                            </Link>
                                                        )}
                                                        <div className="h-full flex flex-1 flex-col justify-between py-1 gap-5">
                                                            <div className="flex flex-col gap-0.5 md:gap-1.5">
                                                                <h2 className="text-base font-semibold line-clamp-1">{product?.name}</h2>
                                                                <p className="text-sm capitalize">Variant:{" "}
                                                                    <span className="font-semibold">{product?.varient}</span>
                                                                </p>
                                                                <p className="text-sm capitalize">Status:{" "}
                                                                    <span className="font-semibold">{product?.status}</span>
                                                                </p>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <AddToWishListButton product={product} className="relative top-0 right-0" />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className='font-bold'>
                                                                            Favorite
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                    <Tooltip>
                                                                        <TooltipTrigger>
                                                                            <Trash
                                                                                onClick={() => handleDeleteCartProduct(product?._id)}
                                                                                className="w-4 h-4 md:w-5 md:h-5 mr-1 text-gray-500 hover:text-red-600 hoverEffect"
                                                                            />
                                                                        </TooltipTrigger>
                                                                        <TooltipContent className='font-bold bg-red-600'>
                                                                            Remove
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-start justify-between h-35 p-0.5 md:p-1">
                                                        <PriceFormatter amount={(product?.price as number) * itemCount} className="font-semibold text-base" />
                                                        <QuantityButtons product={product} />
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        <Button onClick={handleClearCart} className='m-5 font-semibold bg-red-600 text-white hover:scale-95 hover:bg-red-600 hoverEffect' variant='destructive'>Clear Cart</Button>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="lg:col-span-1">
                                        <div className="hidden md:inline-block w-full bg-white p-6 rounded-lg border">
                                            <h2 className="text-xl font-semibold mb-4 ">Order Summary</h2>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <span>SubTotal</span>
                                                    <PriceFormatter amount={getSubTotalPrice()} />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <span>Discount</span>
                                                    <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                                                </div>
                                                <Separator />
                                                <div className="flex items-center justify-between font-semibold text-lg">
                                                    <span>Total</span>
                                                    <PriceFormatter amount={getTotalPrice()} className="font-semibold text-lg text-black" />
                                                </div>
                                                <Button className='w-full rounded-full font-semibold tracking-wide hoverEffect' size='lg'>
                                                    {loading ? "Please wait..." : "Proceed to checkout"}
                                                </Button>
                                            </div>
                                        </div>
                                        {addresses && (
                                            <div className="bg-white rounded-md mt-5">
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle>Delivery Address</CardTitle>
                                                    </CardHeader>
                                                    <CardContent>
                                                        <RadioGroup
                                                            defaultValue={addresses?.find((addr) => addr.default)?._id.toString()}
                                                        >
                                                            {addresses?.map((address) => (
                                                                <div
                                                                    key={address._id}
                                                                    onClick={() => setSelectedAddress(address)}
                                                                    className={`flex items-center space-x-2 mb-4 cursor-pointer ${selectedAddress?._id === address?._id && "text-shop_dark_green"}`}
                                                                >
                                                                    <RadioGroupItem value={address?._id.toString()} />
                                                                    <Label
                                                                        htmlFor={`address-${address?._id}`}
                                                                        className="grid flex-1 gap-1.5"
                                                                    >
                                                                        <span className="font-semibold" >
                                                                            {address?.name}
                                                                        </span>
                                                                        <span className="text-sm text-black/60">
                                                                            {address.address}, {address.city},{" "}
                                                                            {address.state} {address.zip}
                                                                        </span>
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                        <Button variant='outline' className='w-full mt-4'>Add New Address</Button>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {/* for mobile view */}
                                <div className="md:hidden fixed bottom-0 left-0 w-full bg-white pt-2">
                                    <div className=" bg-white p-4 rounded-lg border mx-4">
                                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span>SubTotal</span>
                                                <PriceFormatter amount={getSubTotalPrice()} />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Discount</span>
                                                <PriceFormatter amount={getSubTotalPrice() - getTotalPrice()} />
                                            </div>
                                            <Separator />
                                            <div className="flex items-center justify-between font-semibold text-lg">
                                                <span>Total</span>
                                                <PriceFormatter amount={getTotalPrice()} className="font-semibold text-lg text-black" />
                                            </div>
                                            <Button className='w-full rounded-full font-semibold tracking-wide hoverEffect' size='lg'>
                                                {loading ? "Please wait..." : "Proceed to checkout"}
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <EmptyCart />
                    )}
                </Container>
            ) : (
                <NoAccess />
            )}
        </div>
    )
}

export default CartPage