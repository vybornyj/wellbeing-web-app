import { faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { useDispatch } from 'reactn'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { AdminInput } from 'src/components/common/inputs/AdminInput'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'
import { hotReplacerEn, hotReplacerRu, hotReplacerUrl } from 'src/scripts/helpers/hotReplacers'

interface Props {
  error?: error
  categories?: Categories
}

const Page: NextPage<Props> = ({ error, categories }) => {
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const [stateCategories, setStateCategories] = useState(categories)
  const [doRerender, setDoRerender] = useState(false)

  if (error) return <TemplateAdmin error={error} />

  const setUrl = (key: number, value: string) => {
    const newCategories: Categories = [...stateCategories]
    newCategories[key].url = hotReplacerUrl(value)
    newCategories[key].dbAction = 'update'
    setStateCategories(newCategories)
    setDoRerender(!doRerender)
  }
  const setTitleRu = (key: number, value: string) => {
    const newCategories = [...stateCategories]
    newCategories[key].titleRu = hotReplacerRu(value)
    newCategories[key].dbAction = 'update'
    setStateCategories(newCategories)
    setDoRerender(!doRerender)
  }
  const setTitleEn = (key: number, value: string) => {
    const newCategories = [...stateCategories]
    const newValue = hotReplacerEn(value)
    newCategories[key].titleEn = newValue
    setStateCategories(newCategories)
    setUrl(key, newValue)
  }

  const handleAdd = () => {
    setStateCategories([...stateCategories, { url: '', titleRu: '', titleEn: '', dbAction: 'update' }])
  }

  const handleRemove = (key: number) => {
    const newCategories = [...stateCategories]
    newCategories[key].dbAction = 'delete'
    setStateCategories(newCategories)
    setDoRerender(!doRerender)
  }

  const handleSave = async () => {
    const { categories } = await apiRequestClient('/api/categories/update', { categories: stateCategories })

    if (categories) {
      setStateCategories(categories)
      await STORE_SET_ALERT_POPUP({ inner: 'Категории обновлены' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Категории не обновлены' })
    }
  }

  return (
    <TemplateAdmin title='Категории статей'>
      {stateCategories
        ? stateCategories.map(({ url, titleRu, titleEn, dbAction }, key) =>
            dbAction !== 'delete' ? (
              <div className='category column' key={key}>
                <AdminInput label='Название на русском' value={titleRu} setValue={(value) => setTitleRu(key, value)} />
                <AdminInput label='Название на английском' value={titleEn} setValue={(value) => setTitleEn(key, value)} />
                <AdminInput label='URL адрес категории' value={url} setValue={(value) => setUrl(key, value)} />
                <div className='delete'>
                  <AdminButton onClick={() => handleRemove(key)} type='red' faIcon={faTrash}>
                    Удалить
                  </AdminButton>
                </div>
              </div>
            ) : null,
          )
        : null}
      <div className='space20' />
      <AdminButton onClick={handleAdd} type='blue' faIcon={faPlus}>
        Добавить категорию
      </AdminButton>
      <div className='space20' />
      <AdminButton onClick={handleSave} type='green' faIcon={faSave}>
        Сохранить
      </AdminButton>

      <style jsx>{
        /* language=CSS */ `
          .category {
            margin: 20px 0 60px 0;
          }

          .delete {
            display: flex;
            flex-direction: column;
            margin-top: 15px;
          }

          @media screen and (min-width: 1024px) {
            .category {
              flex-direction: row;
              margin: 10px 0;
            }

            .delete {
              margin-top: 22px;
            }
          }
        `
      }</style>
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => ({
  props: await apiRequestServer(res, '/api/categories/select'),
})

export default Page
