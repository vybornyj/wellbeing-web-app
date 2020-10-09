import { GetServerSideProps, NextPage } from 'next'
import { AdminLayoutEditArticle } from 'src/components/admin/AdminLayoutEditArticle'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  categories?: Categories
}

const Page: NextPage<Props> = ({ error, categories }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Создание новой статьи'>
      <AdminLayoutEditArticle categories={categories} />
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => ({
  props: await apiRequestServer(res, '/api/categories/select'),
})

export default Page
