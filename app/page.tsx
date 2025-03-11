'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useInView } from 'react-intersection-observer'
import { Product } from '@/app/types'
import { getSearchResults } from '@/app/actions/getSearchResults'
import Header from '@/app/components/layout/header'
import SearchList from '@/app/components/search/list'
import SearchDetailsModal from '@/app/components/search/modal'
import SearchStatusFilter from '@/app/components/search/status-filter'

const SearchPage = () => {
  const searchParams = useSearchParams()
  const query = searchParams.get('query')?.trim() || ''
  const [results, setResults] = useState<Product[]>([])
  const [filteredResults, setFilteredResults] = useState<Product[]>([])
  const [selectedItem, setSelectedItem] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const { ref, inView } = useInView()

  useEffect(() => {
    setSelectedItem(null)
    setResults([])
    setFilteredResults([])
    setSelectedStatus(null) // Reset filter when query changes
  }, [query])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await getSearchResults(query)
        setResults((prevResults) => [...prevResults, ...data])
      } catch (error) {
        console.error('Error fetching data:', error)
        setResults([])
      } finally {
        setLoading(false)
      }
    }
    if (inView) fetchData()
  }, [query, inView])

  useEffect(() => {
    if (selectedStatus) {
      setFilteredResults(results.filter((item) => item.status === selectedStatus))
    } else {
      setFilteredResults(results)
    }
  }, [selectedStatus, results])

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-5xl p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          {results.length > 2 && (
            <SearchStatusFilter
              statuses={['In Development', 'Approved', 'Phase 1', 'Phase 2', 'Phase 3']}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
            />
          )}
          <SearchList
            results={filteredResults}
            loading={loading}
            query={query}
            setSelectedItem={setSelectedItem}
          />
          <div ref={ref}>{loading && results.length > 0 ? 'Loading results...' : ''}</div>
        </div>
        <SearchDetailsModal
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </>
  )
}

export default SearchPage
