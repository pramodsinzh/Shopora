import React from 'react'
import { SubTitle } from '../ui/text'; 
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "Under $100 - $500", value: "100-500" },
  { title: "Under $500 - $1000", value: "500-1000" },
  { title: "Under $1000 - $5000", value: "1000-5000" },
  { title: "Over $5000", value: "5000-10000" },
]

interface Props {
  selectedPrice?: string | null
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className='w-full bg-white pt-0 p-5'>
      <SubTitle className='text-base font-semibold underline'>Price</SubTitle>
      <RadioGroup value={selectedPrice || ""} className="mt-2 space-y-1">
        {priceArray?.map((price, index) => (
          <div
            onClick={() => setSelectedPrice(price?.value)}
            className="flex items-center space-x-2 hover:cursor-pointer"
            key={index}
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              className="rounded-sm"
            />
            <Label
              htmlFor={price?.value}
              className={`${selectedPrice === price?.value ? "font-semibold text-shop_dark_green" : "font-normal"}`}
            >{price?.title}</Label>
          </div>
        ))}
        {selectedPrice && (
          <button 
          onClick={()=> setSelectedPrice(null)}
          className='text-sm font-medium mt-2 underline underline-offset-2 decoration-[1px] hover:text-shop_dark_green hoverEffect text-left'
          >
            Reset selection
          </button>
        )}
      </RadioGroup>
    </div>
  )
}

export default PriceList