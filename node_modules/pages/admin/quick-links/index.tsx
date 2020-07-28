import { faPlus, faSave, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { GetServerSideProps, NextPage } from 'next'
import { useState } from 'react'
import { useDispatch } from 'reactn'
import { AdminProductImage } from 'src/components/admin/elements/AdminProductImage'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { AdminInput } from 'src/components/common/inputs/AdminInput'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'
import { hotReplacerEn, hotReplacerRu } from 'src/scripts/helpers/hotReplacers'

interface Props {
  error?: error
  singleton?: QuickLinks
}

const Page: NextPage<Props> = ({ error, singleton }) => {
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const [doRerender, setDoRerender] = useState(false)

  const [title, setTitle] = useState(singleton?.title ?? '')
  const [imageUrl, setImageUrl] = useState(singleton?.imageUrl ?? '')
  const [links, setLinks] = useState(singleton?.links ?? [])
  const [iconLinks, setIconLinks] = useState({
    facebook: singleton?.iconLinks?.facebook ?? '',
    instagram: singleton?.iconLinks?.instagram ?? '',
    youtube: singleton?.iconLinks?.youtube ?? '',
    email: singleton?.iconLinks?.email ?? '',
    phone: singleton?.iconLinks?.phone ?? ''
  })

  if (error) return <TemplateAdmin error={error} />

  const handleAdd = () => {
    setLinks([...links, { urlRu: '', urlEn: '', titleRu: '', titleEn: '' }])
  }

  const handleRemove = (key: number) => {
    const newStateLinks = links.filter((_, k) => k !== key)
    setLinks(newStateLinks)
    setDoRerender(!doRerender)
  }

  const handleSet = (key: number, value: string, property: 'titleRu' | 'titleEn' | 'urlRu' | 'urlEn') => {
    const newStateLinks = [...links]
    newStateLinks[key][property] = property === 'titleRu' ? hotReplacerRu(value) : property === 'titleEn' ? hotReplacerEn(value) : value
    setLinks(newStateLinks)
    setDoRerender(!doRerender)
  }

  const handleSave = async () => {
    const data = {
      singletonId: 1,
      jcontainer: {
        title,
        imageUrl,
        links,
        iconLinks
      }
    }
    const { rowCount } = await apiRequestClient('/api/singletons/update', data)

    if (rowCount) {
      await STORE_SET_ALERT_POPUP({ inner: 'Страница быстрых ссылок обновлена' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Страница быстрых ссылок не обновлена' })
    }
  }

  return (
    <TemplateAdmin title='Быстрые ссылки'>
      <AdminButton href='/quick-links' type='blue'>
        Перейти на страницу быстрых ссылок
      </AdminButton>
      <div className='space20' />
      <AdminProductImage imageUrl={imageUrl} setImageUrl={setImageUrl} alt />
      <div className='space20' />
      <AdminInput label='Название страницы' value={title} setValue={value => setTitle(value)} />
      <div className='space20' />
      {['facebook', 'instagram', 'youtube', 'email', 'phone'].map((name, key) => (
        <div className='column1023row1024' key={key}>
          <AdminInput label={name} value={iconLinks[name]} setValue={value => setIconLinks({ ...iconLinks, [name]: value })} />
          <div className='top22'>
            <AdminButton onClick={() => setIconLinks({ ...iconLinks, [name]: '' })} type='red' faIcon={faTimes}>
              Очистить
            </AdminButton>
          </div>
        </div>
      ))}
      <div className='space20' />
      {links.map(({ urlRu, titleRu, urlEn, titleEn }, key) => (
        <div className='column1023row1024' key={key}>
          <AdminInput label='Название на русском' value={titleRu} setValue={value => handleSet(key, value, 'titleRu')} />
          <AdminInput label='URL на русском' value={urlRu} setValue={value => handleSet(key, value, 'urlRu')} />
          <AdminInput label='Название на английском' value={titleEn} setValue={value => handleSet(key, value, 'titleEn')} />
          <AdminInput label='URL на английском' value={urlEn} setValue={value => handleSet(key, value, 'urlEn')} />
          <div className='top22'>
            <AdminButton onClick={() => handleRemove(key)} type='red' faIcon={faTrash}>
              Удалить
            </AdminButton>
          </div>
        </div>
      ))}
      <div className='space20' />
      <AdminButton onClick={handleAdd} type='blue' faIcon={faPlus}>
        Добавить ссылку
      </AdminButton>
      <div className='space20' />
      <AdminButton onClick={handleSave} type='green' faIcon={faSave}>
        Сохранить
      </AdminButton>

      <style jsx>{
        /* language=CSS */ `
          .top22 {
            margin-top: 22px;
          }
        `
      }</style>
    </TemplateAdmin>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => ({
  props: await apiRequestServer(res, '/api/singletons/select', { singletonId: 1 })
})

export default Page
