import { FunctionComponent } from 'react'
import { AdminButton } from 'src/components/common/buttons/AdminButton'

const getPurchaseLangString = (lang: number) => {
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
  purchases?: Purchases
  activeCount?: number
  completedCount?: number
}

export const AdminLayoutListPurchases: FunctionComponent<Props> = ({ purchases, activeCount, completedCount }) => (
  <>
    <div className='column1023row1024'>
      <AdminButton href='/admin/purchases'>{`Активные заказы (${activeCount})`}</AdminButton>
      <AdminButton href='/admin/purchases/completed'>{`Выполненные заказы (${completedCount})`}</AdminButton>
    </div>
    <div className='space30' />
    <div className='column'>
      {purchases?.map(({ purchaseId, lang, added, productPrice, productTitle, productVariantTitle, userEmail, reportsCount, draftsCount }) => (
        <AdminButton href='/admin/purchases/[purchaseId]' as={`/admin/purchases/${purchaseId}`} justifyContent='flex-start' key={purchaseId} listItem>
          <div className='row'>
            <div className='button-title'>{userEmail ?? '???'}</div>
            <div className='button-title'>
              {productTitle ?? '???'}
              {productVariantTitle ? ` - ${productVariantTitle}` : null}
            </div>
            {draftsCount ? <div className='button-badge red'>{printDraftsCount(draftsCount)}</div> : null}
            {reportsCount ? (
              <div className='button-badge yellow'>{printReportsCount(reportsCount)}</div>
            ) : (
              <div className='button-badge red'>нет отчетов</div>
            )}
          </div>
          <div className='row'>
            <div className='button-badge blue'>{getPurchaseLangString(lang)}</div>
            <div className='button-badge cyan'>{`€${productPrice}`}</div>
            <div className='button-badge gray'>{added.slice(0, 10)}</div>
          </div>
        </AdminButton>
      ))}
    </div>
  </>
)
