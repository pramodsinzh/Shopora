"use client"

import { Product } from '@/sanity.types'
import Container from '@/components/Container'
import { cn } from '@/lib/utils'
import { useState } from 'react'

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'additional', label: 'Additional Information' },
  { id: 'reviews', label: 'Reviews' },
] as const

type TabId = (typeof tabs)[number]['id']

interface Props {
  product: Product | null | undefined
  brandName?: string | null | undefined
}

const ProductTabs = ({ product, brandName }: Props) => {
  const [activeTab, setActiveTab] = useState<TabId>('description')

  const additionalInfo = [
    { label: 'Brand', value: brandName },
    { label: 'Type', value: product?.varient },
    {
      label: 'Stock',
      value: product?.stock ? 'Available' : 'Out of Stock',
    },
  ].filter((item) => item.value)

  return (
    <Container className="pb-10">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-1 rounded-md bg-gray-100 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 rounded-lg px-3 py-2.5 text-sm transition-all duration-300 hoverEffect sm:px-4',
                activeTab === tab.id
                  ? 'bg-white font-semibold text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'description' && (
            <p className="max-w-xl text-sm leading-relaxed text-gray-600">
              {product?.description}
            </p>
          )}

          {activeTab === 'additional' && (
            <div className="max-w-md space-y-4">
              {additionalInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="font-medium text-gray-900">{item.label}</span>
                  <span className="capitalize text-gray-500">{item.value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <p className="text-sm text-gray-500">No reviews yet.</p>
          )}
        </div>
      </div>
    </Container>
  )
}

export default ProductTabs
