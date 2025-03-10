import SearchDetails from '@/app/components/search/details'
import { Product } from '@/app/types'

interface SearchDetailsModalProps {
  selectedItem: Product | null
  setSelectedItem: (item: Product | null) => void
}

const SearchDetailsModal = ({ selectedItem, setSelectedItem }: SearchDetailsModalProps) => {
  if (!selectedItem) return null

  return (
    <div className="fixed md:relative inset-0 p-4 md:p-0 flex md:flex-none justify-center md:justify-normal items-center md:items-start md:w-1/3 md:block">
      <div
        className="absolute bg-black md:bg-white bg-opacity-50 md:bg-opacity-100 w-full h-full md:hidden"
        onClick={() => setSelectedItem(null)}
      ></div>
      <div className="relative bg-white border-gray-300 border p-3 max-w-md w-full md:max-w-none md:flow-root md:sticky md:top-3">
        <SearchDetails
          slug={selectedItem.slug}
          product={selectedItem.product}
          status={selectedItem.status}
          summary={selectedItem.summary}
          description={selectedItem.description}
        />
      </div>
    </div>
  )
}

export default SearchDetailsModal
