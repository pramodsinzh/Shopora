"use client"

import { cn } from '@/lib/utils';
import { Product } from '@/sanity.types'
import useStore from '@/store';
import { Heart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AddToWishListButton = ({ product, className }: { product: Product; className?: string }) => {

  const { favoriteProduct, addToFavorite } = useStore();
  const [existingPrduct, setExistingPrduct] = useState<Product | null>(null)

  useEffect(() => {
    const availableProduct = favoriteProduct?.find(
      (item) => item?._id === product?._id
    )
    setExistingPrduct(availableProduct || null)
  }, [product, favoriteProduct])

  const handleFavorite = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    if (product?._id) {
      addToFavorite(product).then(() => {
        toast.success(existingPrduct ? "Product removed from wishlist" : "Product added to wishlist")
      })
    }
  }

  return (
    <div className={cn("absolute top-2 right-2 z-10 cursor-pointer", className)}>
      <div
        onClick={handleFavorite}
        className={`p-2.5 rounded-full shadow-sm hoverEffect ${
          existingPrduct
            ? "bg-shop_dark_green/90 text-white"
            : "bg-white/90 text-darkColor/70 hover:bg-shop_dark_green/80 hover:text-white"
        }`}
      >
        <Heart size={15} fill={existingPrduct ? "white" : "none"} />
      </div>
    </div>
  )
}

export default AddToWishListButton