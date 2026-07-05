"use client"

import Container from "@/components/Container"
import EmptyCart from "@/components/EmptyCart"
import NoAccess from "@/components/NoAccess"
import { Address } from "@/sanity.types"
import useStore from "@/store"
import { useAuth, useUser } from "@clerk/nextjs"
import { useState } from "react"


const CartPage = () => {

    const { deleteCartProduct, getTotalPrice, getItemCount, getSubTotalPrice, resetCart } = useStore()
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false)
    const groupedItems = useStore((state) => state.getGroupedItems())
    const { isSignedIn } = useAuth()
    const { user } = useUser()
    // const [addresses, setAddresses] = useState<ADDRESS_QUERYRESULT | null>(null)
    const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

    return (
        <div className="bg-gray-50 pb-52 md:pb-10">
            {isSignedIn ? (
                <Container>
                     {groupedItems?.length ? (
                        <p>products</p>
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