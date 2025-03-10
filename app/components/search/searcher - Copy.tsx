'use client'
import Link from 'next/link'
import { Search as LucideSearch, X as LucideX, House as LucideHouse } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, KeyboardEvent } from 'react'
import { useSearchParams } from 'next/navigation'

const Searcher = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState<string>(searchParams.get('query')?.trim() || '')

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/?query=${encodeURIComponent(query)}`)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch()
    }
  }

  const clearQuery = () => {
    setQuery('')
  }

  return (
    <div className="w-full flex items-center gap-4">
      <div className="relative w-full max-w-md flex items-center gap-4">
        <Link
          href="/"
          aria-label="Go to Home"
          rel="preload"
          className="text-gray-400 cursor-pointer hover:text-black"
        >
          <LucideHouse
            size={20}
            aria-label="Go to Homepage"
            aria-hidden="true"
            role="button"
          />
        </Link>

        <div className="relative w-full">
          <LucideSearch
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={15}
            aria-hidden="true"
          />
          <input
            type="text"
            id="search"
            placeholder=""
            className="w-full pl-10 pr-10 py-1 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md text-sm"
            aria-label="Search"
            role="searchbox"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {query && (
            <LucideX
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
              size={20}
              onClick={clearQuery}
              aria-label="Clear search"
              role="button"
            />
          )}
        </div>
        <button
          onClick={handleSearch}
          className="px-4 py-1 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:pointer-events-none"
          aria-label="Submit search"
          disabled={!query}
        >
          Search
        </button>
      </div>
    </div>
  )
}

export default Searcher
