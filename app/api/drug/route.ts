'use server'
import { faker } from '@faker-js/faker'
import { Product } from '@/app/types'
import { NextRequest, NextResponse } from 'next/server'
import { cache } from 'react'

const drugStatuses = ['In Development', 'Approved', 'Phase 1', 'Phase 2', 'Phase 3']
type ProductDetails = Omit<Product, 'id' | 'slug' | 'summary'>

export const GET = cache(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams
  const slug = searchParams.get('slug') || ''
  const formattedSlug = slug.replace(/^\/?drug\//, '').replace(/-/g, ' ')
  const product: ProductDetails = {
    product: formattedSlug.charAt(0).toUpperCase() + formattedSlug.slice(1), // Capitalize first letter
    status: faker.helpers.arrayElement(drugStatuses),
    description: faker.lorem.sentences({ min: 15, max: 20 }),
  }

  return NextResponse.json(product)
})
