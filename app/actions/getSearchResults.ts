import { Product } from '@/app/types'

export const getSearchResults = async (query: string): Promise<Product[]> => {
  try {
    const res = await fetch(`http://localhost:3000/api/search?query=${query}`, {
      cache: 'force-cache',
      next: { revalidate: 86400 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}
