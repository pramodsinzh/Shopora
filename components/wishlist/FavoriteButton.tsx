"use client"

import { Product } from '@/sanity.types'
import useStore from '@/store'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const FavoriteButton = ({ showProduct = false, product }: { showProduct?: boolean, product?: Product | null | undefined }) => {
  const { favoriteProduct, addToFavorite } = useStore()
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

  const count = favoriteProduct?.length ?? 0

  return (
    <>
      {!showProduct ? (
        <Link
          href={'/wishlist'}
          aria-label="View wishlist"
          className='relative flex items-center justify-center w-9 h-9 rounded-full text-darkColor/70 hover:text-shop_dark_green hover:bg-shop_light_green/10 transition-colors duration-200'
        >
          <Heart className='w-[18px] h-[18px]' />
          {count > 0 && (
            <span className='absolute top-0.5 right-0.5 bg-shop_dark_green text-white h-4 w-4 rounded-full text-[10px] font-semibold flex items-center justify-center'>
              {count > 9 ? "9+" : count}
            </span>
          )}
        </Link>
      ) : (
        <button
          onClick={handleFavorite}
          aria-label={existingPrduct ? "Remove from wishlist" : "Add to wishlist"}
          className='flex items-center justify-center border border-shop_light_green/80 hover:border-shop_light_green hover:bg-shop_light_green/10 transition-colors duration-200 p-1.5 rounded-sm'
        >
          {existingPrduct ? (
            <Heart fill='#3b9c3c' className='text-shop_light_green w-5 h-5' />
          ) : (
            <Heart className='text-shop_light_green/80 w-5 h-5' />
          )}
        </button>
      )}
    </>
  )
}

export default FavoriteButton