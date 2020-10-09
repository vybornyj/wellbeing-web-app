import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps, NextPage } from 'next'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  pages?: Pages
}

const Page: NextPage<Props> = ({ error, pages }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Страницы'>
      <AdminButton href='/admin/pages/add' type='blue' faIcon={faPlus}>
        Добавить страницу
      </AdminButton>

      <div className='column'>
        {pages
          ? pages.map(({ pageId, titleRu, titleEn, contentRuLength, contentEnLength }) => (
              <AdminButton href='/admin/pages/[pageId]' as={`/admin/pages/${pageId}`} justifyContent='flex-start' key={pageId}>
                <div className='title'>{titleRu ?? '???'}</div>
                <div className='title'>{titleEn ?? '???'}</div>
                <div className='row'>
                  <div className='item'>{contentRuLength}</div>
                  <div className='item'>{contentEnLength}</div>
                </div>
              </AdminButton>
            ))
          : null}
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
  props: await apiRequestServer(res, '/api/pages/select'),
})

export default Page
