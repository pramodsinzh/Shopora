import { Title } from '../ui/text'
import Link from 'next/link'
import { getAllBrands } from '@/sanity/queries'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'
import { GitCompareArrows, Headset, ShieldCheck, Truck } from 'lucide-react'

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={32} />
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={32} />
  },
  {
    title: "Customer Support",
    description: "Friendly 24/7 customer support",
    icon: <Headset size={32} />
  },
  {
    title: "Money Back Guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={32} />
  },
]

const ShopByBrands = async () => {
  const brands = await getAllBrands()
  return (
    <div className='mt-10 lg:mb-20 mb-10 bg-shop_light_bg p-5 lg:p-8 rounded-2xl'>
      <div className="flex items-start sm:items-center gap-4 content-center justify-between mb-6">
        <Title className='text-xl sm:text-2xl leading-tight'>Shop by brands</Title>
        <Link
          href={"/shop"}
          className='shrink-0 whitespace-nowrap text-sm font-semibold tracking-wide text-shop_dark_green hover:underline underline-offset-4 hoverEffect'
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3">
        {brands?.map((brand) => (
          <Link
            key={brand?._id}
            href={`/shop?brand=${brand?.slug?.current}`}
            className='group bg-white aspect-[4/3] flex items-center justify-center rounded-xl border border-transparent hover:border-shop_light_green/40 hover:shadow-md shadow-shop_dark_green/5 transition-all duration-200 p-4'
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt={brand?.title ?? "brand logo"}
                width={200}
                height={200}
                className='w-full h-full object-contain grayscale-[35%] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-200'
              />
            )}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-shop_dark_green/10">
        {extraData?.map((item, index) => (
          <div key={index} className='flex items-center gap-3.5 group text-lightColor'>
            <span className='inline-flex shrink-0 items-center justify-center w-12 h-12 rounded-full bg-white text-shop_dark_green group-hover:bg-shop_dark_green group-hover:text-white transition-colors duration-200'>
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">{item?.title}</p>
              <p className='text-lightColor'>{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShopByBrands