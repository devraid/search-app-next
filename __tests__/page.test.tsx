import '@testing-library/jest-dom'
import { render, screen, waitFor, act } from '@testing-library/react'
import SearchPage from '@/app/page'

global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
} as any

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: () => ({
    get: () => 'query',
  }),
}))

jest.mock('@/app/actions/getSearchResults', () => ({
  getSearchResults: jest.fn(),
}))

jest.mock('react-intersection-observer', () => ({
  useInView: () => ({ ref: jest.fn(), inView: true }),
}))

describe('SearchPage', () => {
  const mockProducts = [
    { slug: 'drug-1', product: 'Drug 1', status: 'Phase 1', summary: 'Lorem ipsum' },
    { slug: 'drug-2', product: 'Drug 2', status: 'Approved', summary: 'Dolor sit amet' },
  ]
  const { getSearchResults } = require('@/app/actions/getSearchResults')

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders "No results found" when API returns no results', async () => {
    getSearchResults.mockResolvedValueOnce([])
    await act(async () => {
      render(<SearchPage />)
    })
    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument()
    })
  })

  it('renders results when API returns a list of drugs', async () => {
    getSearchResults.mockResolvedValueOnce(mockProducts)
    await act(async () => {
      render(<SearchPage />)
    })
    await waitFor(() => {
      expect(screen.getByText('Drug 1')).toBeInTheDocument()
      expect(screen.getByText('Drug 2')).toBeInTheDocument()
    })
  })

  it('renders products with links for Summary and Full Description', async () => {
    getSearchResults.mockResolvedValueOnce(mockProducts)
    await act(async () => {
      render(<SearchPage />)
    })
    await waitFor(() => {
      const summaryLinks = screen.getAllByRole('link', { name: /Summary/i })
      expect(summaryLinks.length).toBeGreaterThan(0)
      const fullDescriptionLinks = screen.getAllByRole('link', { name: /Full Description/i })
      expect(fullDescriptionLinks.length).toBeGreaterThan(0)
    })
  })
})
