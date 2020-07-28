import { FunctionComponent } from 'react'
import { useDispatch } from 'reactn'
import { ModalConfirmTranslate } from 'src/components/common/modals/ModalConfirmTranslate'
import { ModalTextEditor } from 'src/components/common/modals/ModalTextEditor'
import { apiTranslateHtml } from 'src/scripts/api/apiTranslateHtml'
import { getHtmlContentLength } from 'src/scripts/helpers/getHtmlContentLength'

interface Props {
  contentRu: string
  contentEn: string
  setContentRu: (v) => void
  setContentEn: (v) => void

  contentRuLength: number
  contentEnLength: number
  setContentRuLength: (v) => void
  setContentEnLength: (v) => void

  titleRu: string
  titleEn: string
  labelRu: string
  labelEn: string
}

export const AdminContentEditors: FunctionComponent<Props> = ({
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
  labelRu,
  labelEn
}) => {
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const handleSetRu = (content: string) => {
    setContentRu(content)
    setContentRuLength(getHtmlContentLength(content))
  }

  const handleSetEn = (content: string) => {
    setContentEn(content)
    setContentEnLength(getHtmlContentLength(content))
  }

  const handleTranslateRuToEn = async () => {
    const translated = await apiTranslateHtml(contentRu, 'en')
    if (translated) {
      handleSetEn(translated)
      await STORE_SET_ALERT_POPUP({ inner: 'Переведено' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: не переведено' })
    }
  }

  const handleTranslateEnToRu = async () => {
    const translated = await apiTranslateHtml(contentEn, 'ru')
    if (translated) {
      handleSetRu(translated)
      await STORE_SET_ALERT_POPUP({ inner: 'Переведено' })
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Серверная ошибка: не переведено' })
    }
  }

  return (
    <>
      <ModalTextEditor titles={[labelRu, titleRu]} content={contentRu} contentLength={contentRuLength} setContent={handleSetRu} />
      <div className='column1023row1024'>
        <ModalConfirmTranslate handleTranslate={handleTranslateRuToEn} contentLength={contentEnLength} type='ruToEn' />
        <ModalConfirmTranslate handleTranslate={handleTranslateEnToRu} contentLength={contentRuLength} type='enToRu' />
      </div>
      <ModalTextEditor titles={[labelEn, titleEn]} content={contentEn} contentLength={contentEnLength} setContent={handleSetEn} />
    </>
  )
}
