import { GetServerSideProps, NextPage } from 'next'
import { AdminLayoutEditProduct } from 'src/components/admin/AdminLayoutEditProduct'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'

interface Props {
  currency?: Currency
}

const Page: NextPage<Props> = ({ currency }) => (
  <TemplateAdmin title='Создание нового продукта'>
    <AdminLayoutEditProduct currency={currency} />
  </TemplateAdmin>
)

export const getServerSideProps: GetServerSideProps = async () => ({
  props: {
    currency: await (await fetch('https://api.exchangeratesapi.io/latest')).json()
  }
})

export default Page
