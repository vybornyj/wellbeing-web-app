import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FunctionComponent } from 'react'
import { useDispatch } from 'reactn'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { AdminInput } from 'src/components/common/inputs/AdminInput'
import { apiTranslateHtml } from 'src/scripts/api/apiTranslateHtml'
import { hotReplacerEn, hotReplacerRu, hotReplacerUrl } from 'src/scripts/helpers/hotReplacers'

interface Props {
  url: string
  titleRu: string
  titleEn: string

  setUrl: (v) => void
  setTitleRu: (v) => void
  setTitleEn: (v) => void

  urlLabel: string
  titleRuLabel: string
  titleEnLabel: string
}

export const AdminTitlesUrlInputs: FunctionComponent<Props> = ({
  url,
  titleRu,
  titleEn,
  setUrl,
  setTitleRu,
  setTitleEn,
  urlLabel,
  titleRuLabel,
  titleEnLabel
}) => {
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const setUrlValidation = (value: string) => setUrl(hotReplacerUrl(value))

  const setTitleRuValidation = (value: string) => setTitleRu(hotReplacerRu(value))

  const setTitleEnValidation = (value: string) => {
    const titleEn = hotReplacerEn(value)
    setTitleEn(titleEn)
    setUrlValidation(titleEn)
  }

  const handleTranslateTitleRuToTitleEn = async () => {
    const translated = await apiTranslateHtml(titleRu, 'en')
    if (translated) {
      setTitleEnValidation(translated)
      await STORE_SET_ALERT_POPUP({ inner: 'Переведено' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: не переведено' })
    }
  }

  const handleTranslateTitleEnToTitleRu = async () => {
    const translated = await apiTranslateHtml(titleEn, 'ru')
    if (translated) {
      setTitleRuValidation(translated)
      await STORE_SET_ALERT_POPUP({ inner: 'Переведено' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: не переведено' })
    }
  }

  return (
    <>
      <AdminInput label={titleRuLabel} value={titleRu} setValue={setTitleRuValidation} />
      <div className='column1023row1024'>
        <AdminButton onClick={handleTranslateTitleRuToTitleEn} type='blue' faIcon={faArrowDown}>
          Ру ⇢ En
        </AdminButton>
        <AdminButton onClick={handleTranslateTitleEnToTitleRu} type='blue' faIcon={faArrowUp}>
          En ⇢ Ру
        </AdminButton>
      </div>
      <AdminInput label={titleEnLabel} value={titleEn} setValue={setTitleEnValidation} />
      <AdminInput label={urlLabel} value={url} setValue={setUrlValidation} />
    </>
  )
}
