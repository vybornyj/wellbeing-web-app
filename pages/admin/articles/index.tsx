import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps, NextPage } from 'next'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  articles?: Articles
  categories?: Categories
}

const Page: NextPage<Props> = ({ error, articles, categories }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Статьи блога'>
      <AdminButton href='/admin/articles/add' type='blue' faIcon={faPlus}>
        Добавить статью
      </AdminButton>

      <div className='column'>
        {articles?.map((articles, key) => (
          <AdminButton href='/admin/articles/[articleId]' as={`/admin/articles/${articles.articleId}`} justifyContent='flex-start' key={key}>
            <div className='title'>{articles.titleRu ?? '???'}</div>
            <div className='title'>{articles.titleEn ?? '???'}</div>
            <div className='row'>
              <div className='item'>{articles.contentRuLength}</div>
              <div className='item'>{articles.contentEnLength}</div>
              {articles.categories?.map((categoryId, key) => (
                <div className='item item2' key={key}>
                  {categories?.find(category => category.categoryId === categoryId)?.titleRu}
                </div>
              ))}
              {articles.published ? null : <div className='item item3'>черновик</div>}
            </div>
          </AdminButton>
        ))}
      </div>

      <style jsx>{
        /* language=CSS */ `
          .item {
            font-size: 12px;
            padding: 1px 3px;
            margin: 3px 8px 3px 0;
            border-radius: 4px;
            background: hsl(210, 40%, 65%);
            color: white;
          }

          .item2 {
            background: hsl(190, 40%, 65%);
          }

          .item3 {
            background: hsl(0, 0%, 65%);
          }

          .title {
            padding: 2px 6px;
            margin: 3px 8px 3px 0;
            border-radius: 4px;
            border: 1px solid hsl(210, 40%, 80%);
            color: hsl(210, 40%, 20%);
            background: white;
          }
        `
      }</style>
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => ({
  props: await apiRequestServer(res, '/api/articles/select', { unpublished: true })
})

export default Page
