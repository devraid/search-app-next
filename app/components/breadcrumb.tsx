import Link from 'next/link'

const BreadCrumb = ({ product }: { product: string }) => {
  return (
    <nav className="text-sm text-gray-500 mb-4">
      <Link
        href="/"
        className="text-blue-600 hover:underline"
        rel="noreferrer"
        aria-label="Go to Home"
        title="Go to Home"
      >
        Home
      </Link>
      <span className="mx-2">/</span>
      <span className="text-gray-400">{product}</span>
    </nav>
  )
}

export default BreadCrumb
