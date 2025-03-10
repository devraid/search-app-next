import { LucideSearch, X as LucideX } from 'lucide-react'
import { KeyboardEvent } from 'react'

interface SearchBarProps {
  query: string
  setQuery: (value: string) => void
  onSearch: () => void
}

const SearchBar = ({ query, setQuery, onSearch }: SearchBarProps) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch()
    }
  }

  return (
    <div className="relative w-full">
      <LucideSearch
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        size={15}
        aria-hidden="true"
      />
      <input
        type="text"
        id="search"
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
          onClick={() => setQuery('')}
          aria-label="Clear search"
          role="button"
        />
      )}
    </div>
  )
}

export default SearchBar
