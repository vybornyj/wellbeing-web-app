import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { useDispatch } from 'reactn'
import { AdminContentEditors } from 'src/components/admin/elements/AdminContentEditors'
import { AdminTitlesUrlInputs } from 'src/components/admin/elements/AdminTitlesUrlInputs'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { ModalConfirmDelete } from 'src/components/common/modals/ModalConfirmDelete'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

interface Props {
  page?: Page
}

export const AdminLayoutEditPage: FunctionComponent<Props> = ({ page }) => {
  const router = useRouter()
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const pageId = page?.pageId ?? 0
  const [url, setUrl] = useState(page?.url ?? '')
  const [titleRu, setTitleRu] = useState(page?.titleRu ?? '')
  const [titleEn, setTitleEn] = useState(page?.titleEn ?? '')
  const [contentRu, setContentRu] = useState(page?.contentRu ?? '')
  const [contentEn, setContentEn] = useState(page?.contentEn ?? '')
  const [contentRuLength, setContentRuLength] = useState(page?.contentRuLength ?? 0)
  const [contentEnLength, setContentEnLength] = useState(page?.contentEnLength ?? 0)

  const handleSave = async () => {
    const data: Page = {
      pageId,
      url,
      titleRu,
      titleEn,
      contentRu,
      contentEn,
      contentRuLength,
      contentEnLength,
    }

    const { insertId, rowCount } = await apiRequestClient('/api/pages/insertOrUpdate', data)

    if (insertId) {
      await STORE_SET_ALERT_POPUP({ inner: 'Страница добавлена' })
      await router.push('/admin/pages/[pageId]', `/admin/pages/${insertId}`)
    } else if (rowCount) {
      await STORE_SET_ALERT_POPUP({ inner: 'Страница обновлена' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: страница не сохранена' })
    }
  }

  const handleDelete = async () => {
    const { rowCount } = await apiRequestClient('/api/pages/delete', { pageId })
    if (rowCount) {
      await STORE_SET_ALERT_POPUP({ inner: 'Страница удалена' })
      await router.push('/admin/pages')
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: страница не удалена' })
    }
  }

  return (
    <div className='column'>
      <AdminButton onClick={handleSave} type='green' faIcon={faSave}>
        Сохранить
      </AdminButton>

      {!!pageId && (
        <div className='column1023row1024'>
          <AdminButton href='/[lang]/[url]' as={`/ru/${url}`} type='blue'>
            Опубликованная русскоязычная страница
          </AdminButton>
          <AdminButton href='/[lang]/[url]' as={`/en/${url}`} type='blue'>
            Опубликованная англоязычная страница
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
          urlLabel: 'URL адрес страницы',
          titleRuLabel: 'Название страницы на русском',
          titleEnLabel: 'Название страницы на английском',
        }}
      />

      <h3>Контент</h3>

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
          labelRu: 'Страница на русском',
          labelEn: 'Страница на английском',
        }}
      />

      <div className='space40' />

      <AdminButton onClick={handleSave} type='green' faIcon={faSave}>
        Сохранить
      </AdminButton>

      <div className='space40' />

      {!!pageId && <ModalConfirmDelete handleDelete={handleDelete} />}
    </div>
  )
}
