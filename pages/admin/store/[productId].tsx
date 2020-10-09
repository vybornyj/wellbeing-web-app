import { GetServerSideProps, NextPage } from 'next'
import { AdminLayoutEditProduct } from 'src/components/admin/AdminLayoutEditProduct'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  product?: Product
  currency?: Currency
}

const Page: NextPage<Props> = ({ error, product, currency }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Редактирование продукта'>
      <AdminLayoutEditProduct product={product} currency={currency} />
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: {
    ...(await apiRequestServer(res, '/api/products/adminSelect', {
      productId: params?.productId,
      unpublished: true,
      limit: 1,
    })),
    currency: await (await fetch('https://api.exchangeratesapi.io/latest')).json(),
  },
})

export default Page
