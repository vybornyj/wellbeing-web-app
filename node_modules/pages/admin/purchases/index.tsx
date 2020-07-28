import { GetServerSideProps, NextPage } from 'next'
import { AdminLayoutListPurchases } from 'src/components/admin/AdminLayoutListPurchases'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  purchases?: Purchases
  activeCount?: number
  completedCount?: number
}

const Page: NextPage<Props> = ({ error, purchases, activeCount, completedCount }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Активные заказы'>
      <AdminLayoutListPurchases purchases={purchases} activeCount={activeCount} completedCount={completedCount} />
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => ({
  props: await apiRequestServer(res, '/api/purchases/select', { published: true })
})

export default Page
