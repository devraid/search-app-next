import { act, render, screen, waitFor } from '@testing-library/react'
import DrugPage from '@/app/drug/[slug]/page'
import { getDrugDetails } from '@/app/actions/getDrugDetails'

jest.mock('@/app/actions/getDrugDetails', () => ({
  getDrugDetails: jest.fn(),
}))

describe('DrugPage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the product heading when API returns product details', async () => {
    ;(getDrugDetails as jest.Mock).mockResolvedValueOnce([
      {
        product: 'Drug 1',
        status: 'Phase 1',
        description: 'This is a description of Drug 1',
      },
    ])

    const params = Promise.resolve({ slug: 'drug-1' })

    await act(async () => {
      render(<DrugPage params={params} />)
    })

    await waitFor(() => {
      expect(screen.getByText('Drug 1')).toBeInTheDocument()
    })
  })
})
