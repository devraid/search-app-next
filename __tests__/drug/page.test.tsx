import { render, screen, waitFor, act } from '@testing-library/react'
import DrugPage from '@/app/drug/[slug]/page' // Your component
import { getDrugDetails } from '@/app/actions/getDrugDetails'

// Mock the API function
jest.mock('@/app/actions/getDrugDetails', () => ({
  getDrugDetails: jest.fn(),
}))

describe('DrugPage', () => {
  beforeEach(() => {
    jest.clearAllMocks() // Reset mocks before each test
  })

  it('renders the product heading when API returns product details', async () => {
    const mockProduct = {
      product: 'Drug 1',
      status: 'Phase 1',
      description: 'This is a description of Drug 1',
    }

    // Mock the getDrugDetails response
    ;(getDrugDetails as jest.Mock).mockResolvedValueOnce(mockProduct)

    // Mock the router to simulate the dynamic slug

    // Render the DrugPage component
    await act(async () => {
      render(<DrugPage params={Promise.resolve({ slug: 'nurtrexfat' })} />)
    })

    // Wait for the product details to be rendered
    await waitFor(async () => {
      // Verify that getDrugDetails was called with the correct slug
      expect(getDrugDetails).toHaveBeenCalledWith('nurtrexfat')
      // Verify that the product name is rendered
      expect(screen.getByText('Drug 1')).toBeInTheDocument()
    })
  })
})
