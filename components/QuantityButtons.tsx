import { Product } from '@/sanity.types'
import useStore from '@/store';
import React from 'react'
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Props {
    product: Product;
    className?: string;
}

const QuantityButtons = ({ product, className }: Props) => {

    const { addItem, removeItem, getItemCount } = useStore()
    const itemCount = getItemCount(product?._id)
    const isOutOfStock = product?.stock === 0;

    const handleRemoveProduct = () => {
        removeItem(product?._id)
        if(itemCount > 1) {
            toast.success(`Removed one ${product?.name?.substring(0, 12)} from cart!`)
        } else {
            toast.success(`Removed ${product?.name?.substring(0, 12)} from cart!`)
        }
    }
    const handleAddProduct = () => {
         
        if((product?.stock as number ) > itemCount) {
            addItem(product)
            toast.success(`Added one ${product?.name?.substring(0, 12)} to cart!`)
        } else {
            toast.error(`Sorry, ${product?.name?.substring(0, 12)} is out of stock!`)
        }
    }

    return (
        <div className={cn("flex items-center gap-1 pb-1 text-base", className)}>
            <Button onClick={handleRemoveProduct} variant="outline" size='icon' disabled={itemCount === 0 || isOutOfStock} className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect">
                <Minus />
            </Button>
            <span className='font-semibold text-xs w-6 text-center text-darkColor'>{itemCount}</span>
            <Button onClick={handleAddProduct} variant="outline" size='icon' disabled={isOutOfStock} className="w-6 h-6 border-[1px] hover:bg-shop_dark_green/20 hoverEffect">
                <Plus />
            </Button>
        </div>
    )
}

export default QuantityButtons