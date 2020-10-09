import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps, NextPage } from 'next'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  products?: Products
}

const Page: NextPage<Props> = ({ error, products }) => {
  if (error) return <TemplateAdmin error={error} />

  return (
    <TemplateAdmin title='Магазин'>
      <AdminButton href='/admin/store/add' type='blue' faIcon={faPlus}>
        Добавить продукт
      </AdminButton>

      <div className='column'>
        {products?.map(
          ({ productId, published, titleRu, titleEn, contentRuLength, contentEnLength, contentUserRuLength, contentUserEnLength }, key) => (
            <AdminButton href='/admin/store/[productId]' as={`/admin/store/${productId}`} justifyContent='flex-start' key={key}>
              <div className='title'>{titleRu ?? '???'}</div>
              <div className='title'>{titleEn ?? '???'}</div>
              <div className='row'>
                <div className='item'>{contentRuLength}</div>
                <div className='item'>{contentEnLength}</div>
                <div className='item'>{contentUserRuLength}</div>
                <div className='item'>{contentUserEnLength}</div>
              </div>
              {published ? null : <div className='item item-pub'>снято с продажи</div>}
            </AdminButton>
          ),
        )}
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

          .item-pub {
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
  props: await apiRequestServer(res, '/api/products/adminSelect', { unpublished: true }),
})

export default Page
