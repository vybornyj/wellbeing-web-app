import { GetServerSideProps, NextPage } from 'next'
import { AdminLayoutEditArticle } from 'src/components/admin/AdminLayoutEditArticle'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  article?: Article
  categories?: Categories
}

const Page: NextPage<Props> = ({ error, article, categories }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Редактирование статьи'>
      <AdminLayoutEditArticle article={article} categories={categories} />
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: await apiRequestServer(res, '/api/articles/select', {
    articleId: params?.articleId,
    unpublished: true,
    limit: 1
  })
})

export default Page
