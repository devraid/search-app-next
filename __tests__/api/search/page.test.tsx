/**
 * @jest-environment node
 */
import { GET } from '@/app/api/search/route'
import { NextRequest } from 'next/server'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn: any) => fn,
}))

describe('GET /api/search', () => {
  it('returns a list of drugs matching the query', async () => {
    const request = new NextRequest(new URL('http://localhost/api/search?query=acet'))
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThan(0)
    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('product')
    expect(data[0].product.toLowerCase()).toContain('acet')
  })

  it('returns an empty array if no match is found', async () => {
    const request = new NextRequest(new URL('http://localhost/api/search?query=nonexistent'))
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual([])
  })
})
