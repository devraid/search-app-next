import { Details } from '@/app/types'

const DrughDetails = ({ product, status, description, mechanism, sideEffects }: Details) => {
  return (
    <>
      <h1 className="text-base font-semibold mb-1">{product}</h1>
      {status && (
        <p className="text-xs text-gray-500 mb-1">
          <span className="font-bold">Status:</span> {status}
        </p>
      )}
      <div className="text-gray-700 text-sm leading-4">
        {description && <p className="pb-3">{description}</p>}
        {mechanism && (
          <>
            <h2 className="text-base font-semibold mb-1">Mechanism of Action</h2>
            <p className="pb-3">{mechanism}</p>
          </>
        )}
        {sideEffects && (
          <>
            <h2 className="text-base font-semibold mb-1">Side Effects</h2>
            <p>{sideEffects}</p>
          </>
        )}
      </div>
    </>
  )
}

export default DrughDetails
