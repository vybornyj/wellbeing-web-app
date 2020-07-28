import { faArrowDown, faArrowUp, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FunctionComponent, useState } from 'react'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { AppModalAdmin } from 'src/components/common/modals/AppModalAdmin'

interface Props {
  handleTranslate: () => void
  type: 'ruToEn' | 'enToRu'
  contentLength: number
}

export const ModalConfirmTranslate: FunctionComponent<Props> = ({ handleTranslate, type, contentLength }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)
  const handleClickTranslate = () => {
    contentLength ? handleOpen() : handleTranslate()
  }
  const handleClickTranslateForce = () => {
    handleTranslate()
    handleClose()
  }

  const faIcon = type === 'ruToEn' ? faArrowDown : faArrowUp
  const inner = type === 'ruToEn' ? 'Ру ⇢ En' : 'En ⇢ Ру'
  const text = type === 'ruToEn' ? 'английский' : 'русский'

  return (
    <>
      <AppModalAdmin isOpen={isOpen} closing={handleClose}>
        <h3 className='center'>{`Перевод заменит текущий ${text} текст. Продолжить?`}</h3>
        <div className='column1023row1024'>
          <AdminButton onClick={handleClose} type='blue' faIcon={faTimes}>
            Отмена
          </AdminButton>
          <AdminButton onClick={handleClickTranslateForce} type='green' faIcon={faIcon}>
            Перевести
          </AdminButton>
        </div>
      </AppModalAdmin>

      <AdminButton onClick={handleClickTranslate} type='blue' faIcon={faIcon}>
        {inner}
      </AdminButton>
    </>
  )
}
