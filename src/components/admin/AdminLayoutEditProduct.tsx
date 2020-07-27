import { faExternalLinkAlt, faSave } from '@fortawesome/free-solid-svg-icons'
import getConfig from 'next/config'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { useDispatch } from 'reactn'
import { AdminContentEditors } from 'src/components/admin/elements/AdminContentEditors'
import { AdminProductImage } from 'src/components/admin/elements/AdminProductImage'
import { AdminProductVariants } from 'src/components/admin/elements/AdminProductVariants'
import { AdminSwitchProductLang } from 'src/components/admin/elements/AdminSwitchProductLang'
import { AdminSwitchPublished } from 'src/components/admin/elements/AdminSwitchPublished'
import { AdminTitlesUrlInputs } from 'src/components/admin/elements/AdminTitlesUrlInputs'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { ModalConfirmDelete } from 'src/components/common/modals/ModalConfirmDelete'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

const { publicRuntimeConfig }: GetConfig = getConfig()

interface Props {
  product?: Product
  currency?: Currency
}

export const AdminLayoutEditProduct: FunctionComponent<Props> = ({ product, currency }) => {
  const router = useRouter()
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const productId = product?.productId ?? 0
  const [url, setUrl] = useState(product?.url ?? '')
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? '')
  const [published, setPublished] = useState(product?.published ?? false)
  const [productLang, setProductLang] = useState(product?.productLang ?? 1)
  const [variants, setVariants] = useState(product?.jcontainer?.variants ?? [{ price: '0', titleRu: '', profitRu: '', titleEn: '', profitEn: '' }])
  const [titleRu, setTitleRu] = useState(product?.titleRu ?? '')
  const [titleEn, setTitleEn] = useState(product?.titleEn ?? '')
  const [contentRu, setContentRu] = useState(product?.contentRu ?? '')
  const [contentEn, setContentEn] = useState(product?.contentEn ?? '')
  const [contentRuLength, setContentRuLength] = useState(product?.contentRuLength ?? 0)
  const [contentEnLength, setContentEnLength] = useState(product?.contentEnLength ?? 0)
  const [contentUserRu, setContentUserRu] = useState(product?.contentUserRu ?? '')
  const [contentUserEn, setContentUserEn] = useState(product?.contentUserEn ?? '')
  const [contentUserRuLength, setContentUserRuLength] = useState(product?.contentUserRuLength ?? 0)
  const [contentUserEnLength, setContentUserEnLength] = useState(product?.contentUserEnLength ?? 0)

  const handleSave = async () => {
    const data: Product = {
      productId,
      published,
      productLang,
      url,
      imageUrl,
      titleRu,
      titleEn,
      contentRu,
      contentEn,
      contentUserRu,
      contentUserEn,
      contentRuLength,
      contentEnLength,
      contentUserRuLength,
      contentUserEnLength,
      jcontainer: { variants }
    }

    const { insertId, rowCount } = await apiRequestClient('/api/products/insertOrUpdate', data)

    if (insertId) {
      await STORE_SET_ALERT_POPUP({ inner: 'Продукт добавлен' })
      await router.push('/admin/store/[productId]', `/admin/store/${insertId}`)
    } else if (rowCount) {
      await STORE_SET_ALERT_POPUP({ inner: 'Продукт обновлен' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: продукт не сохранен' })
    }
  }

  const handleDelete = async () => {
    const { rowCount } = await apiRequestClient('/api/products/delete', { productId })
    if (rowCount) {
      await STORE_SET_ALERT_POPUP({ inner: 'Продукт удален' })
      await router.push('/admin/store')
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: продукт не удален' })
    }
  }

  return (
    <div className='wrapper'>
      <AdminButton onClick={handleSave} type='green' faIcon={faSave}>
        Сохранить
      </AdminButton>

      {!!productId && !!published && (
        <div className='column1023row1024'>
          <AdminButton href={`${publicRuntimeConfig.URL_APP}/ru/products/${url}`} type='blue' faIcon={faExternalLinkAlt}>
            Страница продукта на русском
          </AdminButton>
          <AdminButton href={`${publicRuntimeConfig.URL_APP}/en/products/${url}`} type='blue' faIcon={faExternalLinkAlt}>
            Страница продукта на английском
          </AdminButton>
        </div>
      )}

      <div className='space40' />

      <AdminTitlesUrlInputs
        {...{
          url,
          titleRu,
          titleEn,
          setUrl,
          setTitleRu,
          setTitleEn,
          urlLabel: 'URL адрес продукта',
          titleRuLabel: 'Название продукта на русском',
          titleEnLabel: 'Название продукта на английском'
        }}
      />

      <div className='space40' />

      <h3>Изображение продукта</h3>
      <AdminProductImage imageUrl={imageUrl} setImageUrl={setImageUrl} />

      <div className='space40' />

      <h3>Варианты продукта</h3>
      <AdminProductVariants variants={variants} setVariants={setVariants} currency={currency} />

      <div className='space40' />

      <h3>Язык продукта</h3>
      <AdminSwitchProductLang productLang={productLang} setProductLang={setProductLang} />

      <div className='space40' />

      <h3>Страницы в магазине</h3>
      <AdminContentEditors
        {...{
          contentRu,
          contentEn,
          setContentRu,
          setContentEn,
          contentRuLength,
          contentEnLength,
          setContentRuLength,
          setContentEnLength,
          titleRu,
          titleEn,
          labelRu: 'Описание продукта на русском',
          labelEn: 'Описание продукта на английском'
        }}
      />

      <h3>Страницы пользователя после покупки</h3>
      <AdminContentEditors
        {...{
          contentRu: contentUserRu,
          contentEn: contentUserEn,
          setContentRu: setContentUserRu,
          setContentEn: setContentUserEn,
          contentRuLength: contentUserRuLength,
          contentEnLength: contentUserEnLength,
          setContentRuLength: setContentUserRuLength,
          setContentEnLength: setContentUserEnLength,
          titleRu,
          titleEn,
          labelRu: 'Страница пользователя на русском',
          labelEn: 'Страница пользователя на английском'
        }}
      />

      <div className='space40' />

      <AdminSwitchPublished published={published} setPublished={setPublished} falseText='Снято с продажи' trueText='В продаже' />

      <div className='space40' />

      <AdminButton onClick={handleSave} type='green' faIcon={faSave}>
        Сохранить
      </AdminButton>

      <div className='space40' />

      {!!productId && <ModalConfirmDelete handleDelete={handleDelete} />}

      <style jsx>{
        /* language=CSS */ `
          .wrapper {
            display: flex;
            flex-direction: column;
          }

          h3 {
            background: -webkit-linear-gradient(hsl(210, 50%, 40%), hsl(180, 50%, 40%));
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            font-size: 22px;
            margin: 12px 10px 8px 10px;
          }
        `
      }</style>
    </div>
  )
}
