import React from 'react'
import { Title } from '../ui/text'
import { Category } from '@/sanity.types'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import Link from 'next/link'

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className='bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 md:py-7 rounded-md'>
      <Title className='border-b pb-3'>Popular Categories</Title>
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories?.map((category) => (
          <Link
            href={`/category/${category?.slug?.current}`}
            className="bg-shop_light_bg p-5 flex items-center gap-3 group"
            key={category?._id}
          >
            {category?.image && (
              <div className="overflow-hidden border border-shop_orange/30 hover:border-shop_orange hoverEffect w-20 h-20 p-1">
                <Image
                  src={urlFor(category?.image).url()}
                  alt='categoryImage'
                  width={500}
                  height={500}
                  className='w-full h-full object-contain group-hover:scale-110 hoverEffect'
                />
              </div>
            )}
            <div className="space-y-1">
              <h3 className='text-base font-semibold'>{category?.title}</h3>
              <p className='text-sm'><span className='font-bold text-shop_dark_green'>{`(${category?.productCount})`}</span>{" "}items Available</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default HomeCategories