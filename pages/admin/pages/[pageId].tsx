import { GetServerSideProps, NextPage } from 'next'
import { AdminLayoutEditPage } from 'src/components/admin/AdminLayoutEditPage'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  page?: Page
}

const Page: NextPage<Props> = ({ error, page }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Редактирование страницы'>
      <AdminLayoutEditPage page={page} />
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: await apiRequestServer(res, '/api/pages/select', { pageId: params?.pageId, limit: 1 })
})

export default Page
