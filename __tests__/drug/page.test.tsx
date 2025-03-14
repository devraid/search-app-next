import DrugPage from '@/app/drug/[slug]/page'
import { getDrugDetails } from '@/app/actions/getDrugDetails'
import { render, act, screen, waitFor } from '@testing-library/react'

jest.mock('@/app/actions/getDrugDetails', () => ({
  getDrugDetails: jest.fn(),
}))

describe('DrugPage (Server Component)', () => {
  it('renders drug details for a given slug', async () => {
    ;(getDrugDetails as jest.Mock).mockResolvedValueOnce([
      {
        product: 'Acet',
        status: 'Phase 1',
        description: 'This is a description of Drug 1',
        mechanism: 'This is a description of Drug 1',
        sideEffects: 'This is a description of Drug 1',
      },
    ])

    const params = { params: Promise.resolve({ slug: 'acet' }) }
    await act(async () => {
      render(await DrugPage(params))
    })

    // TODO: More testing to come.
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument()
    })
  })
})
