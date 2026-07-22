"use client"

import { productType } from '@/constants/data'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Props {
    selectedTab: string;
    onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTab, onTabSelect }: Props) => {
    return (
        <div className='mt-10 flex items-center justify-between gap-3'>
            <div className="flex-1 min-w-0 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex items-center gap-2 pb-1">
                    {productType?.map((item) => {
                        const isActive = selectedTab === item?.title
                        return (
                            <button
                                key={item?.title}
                                onClick={() => onTabSelect(item?.title)}
                                className={`shrink-0 whitespace-nowrap text-sm font-medium px-4 py-2 md:px-5 md:py-2.5 rounded-full border transition-all duration-200 ${
                                    isActive
                                        ? "bg-shop_dark_green text-white border-shop_dark_green shadow-sm shadow-shop_dark_green/20"
                                        : "bg-white text-darkColor/70 border-gray-200 hover:border-shop_light_green hover:text-shop_dark_green"
                                }`}
                            >
                                {item?.title}
                            </button>
                        )
                    })}
                </div>
            </div>

            <Link
                href={'/shop'}
                className="shrink-0 flex items-center gap-1 text-sm font-semibold text-shop_dark_green hover:gap-1.5 transition-all duration-200 pl-2"
            >
                See all
                <ArrowRight className="w-3.5 h-3.5" />
            </Link>
        </div>
    )
}

export default HomeTabBar