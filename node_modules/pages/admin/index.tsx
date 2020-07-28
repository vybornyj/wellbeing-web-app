import { faFile, faParagraph, faPlus } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps, NextPage } from 'next'
import SQL from 'sql-template-strings'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface Props {
  articlesCount?: number
  articlesDraftsCount?: number
  articlesLastAdded?: string
  pagesCount?: number
}

const Page: NextPage<Props> = props => {
  const { articlesCount = '?', articlesDraftsCount = '?', articlesLastAdded = '?', pagesCount = '?' } = props

  return (
    <TemplateAdmin>
      <div className='widgets'>
        <div className='widget'>
          <div className='title'>Статьи</div>
          <div className='content'>
            <div className='row'>
              <div className='row'>Опубликовано статей: {articlesCount}</div>
              <div className='row'>Черновиков статей: {articlesDraftsCount}</div>
              <div className='row'>Последняя публикация: {articlesLastAdded}</div>
            </div>
            <div className='space20' />
            <AdminButton href='/admin/articles' faIcon={faParagraph}>
              Список статей
            </AdminButton>
            <AdminButton href='/admin/articles/add' faIcon={faPlus}>
              Добавить статью
            </AdminButton>
          </div>
        </div>
        <div className='widget'>
          <div className='title'>Страницы</div>
          <div className='content'>
            <div className='row'>Опубликовано страниц: {pagesCount}</div>
            <div className='space20' />
            <AdminButton href='/admin/pages' faIcon={faFile}>
              Список страниц
            </AdminButton>
            <AdminButton href='/admin/pages/add' faIcon={faPlus}>
              Добавить страницу
            </AdminButton>
          </div>
        </div>
      </div>

      <style jsx>{
        /* language=CSS */ `
          .widgets {
            display: flex;
            flex-wrap: wrap;
          }

          .widget {
            flex: 1 0;
            min-width: 300px;
            border-radius: 12px;
            box-shadow: 0 0 4px -1px hsl(240, 20%, 20%);
            background: linear-gradient(60deg, hsla(150, 40%, 40%, 0.75), hsla(210, 40%, 40%, 0.75));
            margin: 15px;
          }

          .row {
            margin: 0 4px;
            flex-direction: column;
          }

          .title {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: white;
            background-color: hsla(0, 0%, 0%, 0.2);
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
          }

          .content {
            display: flex;
            justify-content: space-between;
            flex-direction: column;
            font-size: 16px;
            /*color: hsl(240, 20%, 20%);*/
            color: white;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            padding: 15px;
          }
        `
      }</style>
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = withSession(async ({ req }) => {
  const { userId, isAdmin } = req?.session?.get('user') ?? {}

  if (!isAdmin) {
    logger.error(`/pages/admin/index: (!isAdmin), userId=${userId}`)
    return { props: {} }
  }

  const result1 = await pgQuery(SQL/* language=SQL */ `select COUNT(*) from "articles" where "published" = ${true}`)
  const articlesCount = result1?.rows?.[0]?.count

  const result2 = await pgQuery(SQL/* language=SQL */ `select COUNT(*) from "articles" where "published" = ${false}`)
  const articlesDraftsCount = result2?.rows?.[0]?.count

  const result3 = await pgQuery(SQL/* language=SQL */ `select "added" from "articles" order by "articleId" desc limit ${1}`)
  const articlesLastAdded = result3?.rows?.[0]?.added?.toISOString()?.slice(0, 10)

  const result4 = await pgQuery(SQL/* language=SQL */ `select COUNT(*)
                                    from "pages"`)
  const pagesCount = result4?.rows?.[0]?.count

  if (result1.err || result2.err || result3.err || result4.err) {
    logger.error(`/pages/admin/index: (result1.err || result2.err || result3.err || result4.err), userId=${userId}`)
    return { props: {} }
  }

  return { props: { articlesCount, articlesDraftsCount, articlesLastAdded, pagesCount } }
})

export default Page
