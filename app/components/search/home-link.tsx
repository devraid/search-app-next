import Link from 'next/link'
import { House as LucideHouse } from 'lucide-react'

interface SearchHomeLinkProps {
  clearQuery: () => void
}

const SearchHomeLink = ({ clearQuery }: SearchHomeLinkProps) => {
  const handleClick = () => {
    clearQuery()
  }

  return (
    <Link
      href="/"
      aria-label="Go to Home"
      title="Go to Home"
      rel="preload"
      className="text-gray-400 cursor-pointer hover:text-black"
      onClick={handleClick}
    >
      <LucideHouse
        size={20}
        aria-hidden="true"
        role="button"
      />
    </Link>
  )
}

export default SearchHomeLink
