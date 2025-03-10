'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchHomeLink from '@/app/components/search/home-link'
import SearchBar from '@/app/components/search/searchbar'
import SearchSubmit from '@/app/components/search/submit'

const Searcher = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState<string>(searchParams.get('query')?.trim() || '')

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/?query=${encodeURIComponent(query)}`)
    }
  }

  const clearQuery = () => {
    setQuery('')
  }

  return (
    <div className="w-full flex items-center gap-4">
      <div className="relative w-full max-w-md flex items-center gap-4">
        <SearchHomeLink clearQuery={clearQuery} />
        <SearchBar
          query={query}
          setQuery={setQuery}
          onSearch={handleSearch}
        />
        <SearchSubmit
          onSearch={handleSearch}
          disabled={!query}
        />
      </div>
    </div>
  )
}

export default Searcher
