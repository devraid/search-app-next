interface SearchStatusFilterrProps {
  statuses: string[]
  selectedStatus: string | null
  setSelectedStatus: (status: string | null) => void
}

const SearchStatusFilter: React.FC<SearchStatusFilterrProps> = ({ statuses, selectedStatus, setSelectedStatus }) => {
  if (statuses.length < 2) return null

  return (
    <div className="mb-4 border-b border-gray-300 pb-5">
      <h1 className="text-base font-semibold">Filter by Status:</h1>
      <div className="flex flex-wrap justify-start gap-2 mt-2">
        {statuses.map((status) => (
          <button
            key={status}
            className={`px-3 py-1 border rounded ${
              selectedStatus === status ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            role="button"
            onClick={() => setSelectedStatus(status === selectedStatus ? null : status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SearchStatusFilter
