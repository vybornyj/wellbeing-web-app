import { faSave } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { useDispatch } from 'reactn'
import { AdminArticleCategories } from 'src/components/admin/elements/AdminArticleCategories'
import { AdminContentEditors } from 'src/components/admin/elements/AdminContentEditors'
import { AdminSwitchPublished } from 'src/components/admin/elements/AdminSwitchPublished'
import { AdminTitlesUrlInputs } from 'src/components/admin/elements/AdminTitlesUrlInputs'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { ModalConfirmDelete } from 'src/components/common/modals/ModalConfirmDelete'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

interface Props {
  article?: Article
  categories?: Categories
}

export const AdminLayoutEditArticle: FunctionComponent<Props> = ({ article, categories }) => {
  const router = useRouter()
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const articleId = article?.articleId ?? 0
  const [url, setUrl] = useState(article?.url ?? '')
  const [published, setPublished] = useState(article?.published ?? false)
  const [titleRu, setTitleRu] = useState(article?.titleRu ?? '')
  const [titleEn, setTitleEn] = useState(article?.titleEn ?? '')
  const [contentRu, setContentRu] = useState(article?.contentRu ?? '')
  const [contentEn, setContentEn] = useState(article?.contentEn ?? '')
  const [contentRuLength, setContentRuLength] = useState(article?.contentRuLength ?? 0)
  const [contentEnLength, setContentEnLength] = useState(article?.contentEnLength ?? 0)
  const [categoriesIds, setCategoriesIds] = useState(article?.categories ?? [])

  const handleSave = async () => {
    const data: Article = {
      articleId,
      published,
      url,
      titleRu,
      titleEn,
      contentRu,
      contentEn,
      contentRuLength,
      contentEnLength,
      categories: categoriesIds,
    }

    const { insertId, rowCount } = await apiRequestClient('/api/articles/insertOrUpdate', data)

    if (insertId) {
      await STORE_SET_ALERT_POPUP({ inner: 'Статья добавлена' })
      await router.push('/admin/articles/[articleId]', `/admin/articles/${insertId}`)
    } else if (rowCount) {
      await STORE_SET_ALERT_POPUP({ inner: 'Статья обновлена' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: статья не сохранена' })
    }
  }

  const handleDelete = async () => {
    const { rowCount } = await apiRequestClient('/api/articles/delete', { articleId })
    if (rowCount) {
      await STORE_SET_ALERT_POPUP({ inner: 'Статья удалена' })
      await router.push('/admin/articles')
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: статья не удалена' })
    }
  }

  return (
    <div className='column'>
      <AdminButton onClick={handleSave} type='green' faIcon={faSave}>
        Сохранить
      </AdminButton>

      {!!articleId && published && (
        <div className='column1023row1024'>
          <AdminButton href='/[lang]/articles/[url]' as={`/ru/articles/${url}`} type='blue'>
            Опубликованная русскоязычная статья
          </AdminButton>
          <AdminButton href='/[lang]/articles/[url]' as={`/en/articles/${url}`} type='blue'>
            Опубликованная англоязычная статья
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
          urlLabel: 'URL адрес статьи',
          titleRuLabel: 'Название статьи на русском',
          titleEnLabel: 'Название статьи на английском',
        }}
      />

      <h3>Категории</h3>

      <AdminArticleCategories categories={categories} categoriesIds={categoriesIds} setCategoriesIds={setCategoriesIds} />

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
          labelRu: 'Статья на русском',
          labelEn: 'Статья на английском',
        }}
      />

      <div className='space40' />

      <AdminSwitchPublished published={published} setPublished={setPublished} falseText='Черновик' trueText='Публикация' />

      <div className='space40' />

      <AdminButton onClick={handleSave} type='green' faIcon={faSave}>
        Сохранить
      </AdminButton>

      <div className='space40' />

      {!!articleId && <ModalConfirmDelete handleDelete={handleDelete} />}
    </div>
  )
}
