import SearchItem from '@/app/components/search/item'
import SearchNotFound from '@/app/components/search/not-found'
import { Product } from '@/app/types'

interface SearchListProps {
  results: Product[]
  loading: boolean
  query: string
  setSelectedItem: (item: Product) => void
}

const SearchList = ({ results, loading, query, setSelectedItem }: SearchListProps) => {
  return (
    <>
      {!loading && results.length === 0 ? (
        <SearchNotFound query={query} />
      ) : (
        <ul
          className="space-y-6"
          role="list"
        >
          {results.map((item, index) => (
            <SearchItem
              key={index}
              slug={item.slug}
              product={item.product}
              status={item.status}
              summary={item.summary}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </ul>
      )}
    </>
  )
}

export default SearchList
