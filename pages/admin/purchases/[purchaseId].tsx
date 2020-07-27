import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { useDispatch } from 'reactn'
import { AdminLayoutEditReports } from 'src/components/admin/AdminLayoutEditReports'
import { AdminSwitchPublished } from 'src/components/admin/elements/AdminSwitchPublished'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

const getPurchaseLangString = (lang?: 1 | 2) => {
  if (lang === 1) return 'на русском'
  if (lang === 2) return 'на английском'
  return '???'
}
const printReportsCount = (count: number) => {
  if (count === 1) return `${count} отчет`
  if (count >= 2 && count <= 4) return `${count} отчета`
  return `${count} отчетов`
}
const printDraftsCount = (count: number) => {
  if (count === 1) return `${count} черновик`
  if (count >= 2 && count <= 4) return `${count} черновика`
  return `${count} черновиков`
}

interface Props {
  error?: error
  email?: string
  purchases?: Purchases
  reports?: Reports
  purchaseId?: Purchase['purchaseId']
}

const Page: NextPage<Props> = ({ error, email, purchases, reports, purchaseId }) => {
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const [doRerender, setDoRerender] = useState(false)
  const [localPurchases, setLocalPurchases] = useState(purchases)

  if (error) return <TemplateAdmin error={error} />

  const handleReload = async () => {
    const { purchases } = await apiRequestClient('/api/purchases/select2', { purchaseId })
    setLocalPurchases(purchases)
    setDoRerender(!doRerender)
  }

  const handleSavePublished = async (published: boolean) => {
    const data = { purchaseId, published }
    const { rowCount } = await apiRequestClient('/api/purchases/update', data)

    if (rowCount) {
      await STORE_SET_ALERT_POPUP({ inner: 'Статус обновлен' })
      await handleReload()
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Ошибка сервера, статус не обновлен' })
    }
  }

  return (
    <TemplateAdmin title='Заказы'>
      <h3>{`Все заказы для ${email}`}</h3>
      <div className='column'>
        {localPurchases?.map(({ purchaseId, productPrice, productTitle, productVariantTitle, lang, added, draftsCount, reportsCount, published }) => (
          <AdminButton
            href='/admin/purchases/[purchaseId]'
            as={`/admin/purchases/${purchaseId}`}
            justifyContent='flex-start'
            key={purchaseId}
            listItem
          >
            <div className='row'>
              <div className='button-title'>
                {productTitle ?? '???'}
                {productVariantTitle ? ` - ${productVariantTitle}` : null}
              </div>
              {!published ? <div className='button-badge green'>Выполнен!</div> : null}
              {draftsCount ? <div className='button-badge red'>{printDraftsCount(draftsCount)}</div> : null}
              {reportsCount ? (
                <div className='button-badge yellow'>{printReportsCount(reportsCount)}</div>
              ) : (
                <div className='button-badge red'>Нет отчетов</div>
              )}
            </div>
            <div className='row'>
              <div className='button-badge blue'>{getPurchaseLangString(lang)}</div>
              <div className='button-badge cyan'>{`€${productPrice}`}</div>
              <div className='button-badge gray'>{added?.slice(0, 10)}</div>
            </div>
          </AdminButton>
        ))}
      </div>
      <h3>Статус выбранного заказа</h3>
      <AdminSwitchPublished
        published={localPurchases?.find(purchase => purchase?.purchaseId === purchaseId)?.published}
        setPublished={handleSavePublished}
        falseText='Выполнен'
        trueText='Активен'
      />
      <AdminLayoutEditReports
        reports={reports}
        purchaseId={purchaseId}
        reload={handleReload}
        lang={localPurchases?.find(purchase => purchase?.purchaseId === purchaseId)?.lang === 1 ? 'ru' : 'en'}
      />
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: {
    ...(await apiRequestServer(res, '/api/purchases/select2', { purchaseId: params?.purchaseId })),
    purchaseId: Number(params?.purchaseId)
  }
})

export default Page
