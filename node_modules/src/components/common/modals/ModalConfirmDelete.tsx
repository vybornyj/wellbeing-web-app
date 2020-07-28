import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FunctionComponent, useState } from 'react'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { AppModalAdmin } from 'src/components/common/modals/AppModalAdmin'

interface Props {
  handleDelete: () => void
}

export const ModalConfirmDelete: FunctionComponent<Props> = ({ handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  return (
    <>
      <AppModalAdmin isOpen={isOpen} closing={handleClose}>
        <h3 className='center'>Действительно удалить?!</h3>
        <div className='column1023row1024'>
          <AdminButton onClick={handleClose} type='blue' faIcon={faTimes}>
            Отмена
          </AdminButton>
          <AdminButton onClick={handleDelete} type='red' faIcon={faTrash}>
            Удалить
          </AdminButton>
        </div>
      </AppModalAdmin>

      <AdminButton onClick={handleOpen} type='red' faIcon={faTrash}>
        Удалить
      </AdminButton>
    </>
  )
}
