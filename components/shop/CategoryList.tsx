import { Category } from '@/sanity.types'
import React from 'react'
import { SubTitle } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
  categories: Category[]
  selectedCategory?: string | null
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryList = ({ categories, selectedCategory, setSelectedCategory }: Props) => {
  return (
    <div className='w-full bg-white p-5'>
      <SubTitle className='text-base font-semibold'>Product Categories</SubTitle>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {categories?.map((category) => (
          <div
            onClick={() => setSelectedCategory(category?.slug?.current as string)}
            className="flex items-center space-x-2 cursor-pointer"
            key={category?._id}
          >
            <RadioGroupItem
              value={category?.slug?.current as string}
              id={category?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={category?.slug?.current}
              className={`${selectedCategory === category?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >{category?.title}</Label>
          </div>
        ))}
        {selectedCategory && (
          <button 
          onClick={()=> setSelectedCategory(null)}
          className='text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left'
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  )
}

export default CategoryList