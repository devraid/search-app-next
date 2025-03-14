export interface Product {
  id: number
  slug: string
  product: string
  status: string
  summary: string
  description: string
}

export interface Details extends Omit<Product, 'id' | 'slug' | 'summary'> {
  mechanism: string
  sideEffects: string
}
