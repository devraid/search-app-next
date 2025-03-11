import { getDrugDetails } from '@/app/actions/getDrugDetails'
import Header from '@/app/components/layout/header'
import DrugDetails from '@/app/components/drug/details'
import BreadCrumb from '@/app/components/breadcrumb'

const DrugPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const product = await getDrugDetails(slug)

  if (!product) {
    return <div>product not found</div>
  }

  return (
    <>
      <Header />
      <div className="container mx-auto max-w-5xl p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <BreadCrumb product={product.product} />
          <DrugDetails
            product={product.product}
            status={product.status}
            description={product.description}
          />
        </div>
      </div>
    </>
  )
}

export default DrugPage
