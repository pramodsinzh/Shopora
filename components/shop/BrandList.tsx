import { BRANDS_QUERY_RESULT } from '@/sanity.types';
import React from 'react'
import { SubTitle } from '../ui/text';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

interface Props {
  brands: BRANDS_QUERY_RESULT
  selectedBrand?: string | null
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({brands, selectedBrand, setSelectedBrand}: Props) => {
  return (
    <div className='w-full bg-white pt-0 p-5'>
      <SubTitle className='text-base font-semibold underline'>Brands</SubTitle>
      <RadioGroup value={selectedBrand || ""} className="mt-2 space-y-1">
        {brands?.map((brand) => (
          <div
            onClick={() => setSelectedBrand(brand?.slug?.current as string)}
            className="flex items-center space-x-2 hover:cursor-pointer"
            key={brand?._id}
          >
            <RadioGroupItem
              value={brand?.slug?.current as string}
              id={brand?.slug?.current}
              className="rounded-sm"
            />
            <Label
              htmlFor={brand?.slug?.current}
              className={`${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >{brand?.title}</Label>
          </div>
        ))}
        {selectedBrand && (
          <button 
          onClick={()=> setSelectedBrand(null)}
          className='text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left'
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  )
}

export default BrandList