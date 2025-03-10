import { Product } from '@/app/types'
type DrugDetailsProps = Omit<Product, 'id' | 'slug' | 'summary'>

const DrughDetails = ({ product, status, description }: DrugDetailsProps) => {
  return (
    <>
      <h1 className="text-base font-semibold mb-1">{product}</h1>
      <p className="text-xs text-gray-500 mb-1">
        <span className="font-bold">Status:</span> {status}
      </p>
      <div className="text-gray-700 text-sm leading-4">
        <p className="pb-3">{description}</p>
        <p className="pb-3">{description}</p>
        <p className="pb-3">{description}</p>
        <p>{description}</p>
      </div>
    </>
  )
}

export default DrughDetails
