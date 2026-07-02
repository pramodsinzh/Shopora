"use client"

import { Product } from '@/sanity.types'
import { Button } from './ui/button'
import { ShoppingBag } from 'lucide-react'
import { cn } from '@/lib/utils'
import useStore from '@/store'

interface Props {
  product: Product 
  className?: string
}

const AddToCartButton = ({ product, className }: Props) => {
  const { addItem, getItemCount } = useStore()
  const itemCount = getItemCount(product?._id)
  
  const isOutOfStock = product?.stock === 0
  const handleAddToCart = () => {
     if((product?.stock as number) > itemCount){
      addItem(product)
     }
  }
  return (
    <div className='w-full h-12 flex items-center'>
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn("w-full bg-shop_dark_green/80 text-shop_light_bg shadow-none border border-shop_dark_green/80 font-semibold tracking-wide hover:text-white hover:bg-shop_dark_green hover:border-shop_dark_green hoverEffect", className)}>
        <ShoppingBag /> {isOutOfStock ? "Out Of Stock" : "Add To Cart"}
      </Button>
    </div>
  )
}

export default AddToCartButton
