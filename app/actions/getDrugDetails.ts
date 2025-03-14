import { Details } from '@/app/types'

export const getDrugDetails = async (slug: string): Promise<Details | null> => {
  try {
    const res = await fetch(`http://localhost:3000/api/drug?slug=${slug}`, {
      cache: 'force-cache',
      next: { revalidate: 86400 },
    })
    if (!res.ok) return null
    const data = await res.json()
    return Array.isArray(data) ? data[0] || null : data
  } catch {
    return null
  }
}
