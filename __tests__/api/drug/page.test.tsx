/**
 * @jest-environment node
 */
import { GET } from '@/app/api/drug/route'
import { NextRequest } from 'next/server'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  cache: (fn: any) => fn,
}))

describe('GET /api/search', () => {
  it('returns product details for a valid slug', async () => {
    const request = new NextRequest(new URL('http://localhost/api/search?slug=/drug/acetafrin-fast'))
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toHaveProperty('product')
    expect(data).toHaveProperty('status')
    expect(data).toHaveProperty('description')
    expect(data.product).toBe('Acetafrin fast')
  })

  it('returns a product with a capitalized name even if the slug is lowercase', async () => {
    const request = new NextRequest(new URL('http://localhost/api/search?slug=/drug/naprovil-extra'))
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.product).toBe('Naprovil extra')
  })

  it('returns a default product for an empty slug', async () => {
    const request = new NextRequest(new URL('http://localhost/api/search?slug='))
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.product).toBe('')
  })
})
