import { NextPage } from 'next'
import { AdminLayoutEditPage } from 'src/components/admin/AdminLayoutEditPage'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'

const Page: NextPage = () => (
  <TemplateAdmin title='Создание новой страницы'>
    <AdminLayoutEditPage />
  </TemplateAdmin>
)

export default Page
