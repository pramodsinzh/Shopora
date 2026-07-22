"use client"

import useStore from '@/store'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const CartIcon = () => {
  const { items } = useStore()
  const count = items?.length ?? 0

  return (
    <Link
      href={'/cart'}
      aria-label="View cart"
      className='relative flex items-center justify-center w-9 h-9 rounded-full text-darkColor/70 hover:text-shop_dark_green hover:bg-shop_light_green/10 transition-colors duration-200'
    >
      <ShoppingBag className='w-[18px] h-[18px]' />
      {count > 0 && (
        <span className='absolute top-0.5 right-0.5 bg-shop_dark_green text-white h-4 w-4 rounded-full text-[10px] font-semibold flex items-center justify-center'>
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  )
}

export default CartIcon