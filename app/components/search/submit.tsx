interface SearchSubmitnProps {
  onSearch: () => void
  disabled: boolean
}

const SearchSubmit = ({ onSearch, disabled }: SearchSubmitnProps) => (
  <button
    onClick={onSearch}
    className="px-4 py-1 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:pointer-events-none"
    aria-label="Submit search"
    disabled={disabled}
  >
    Search
  </button>
)

export default SearchSubmit
