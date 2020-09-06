import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FunctionComponent, useRef, useState } from 'react'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { apiRequestClientUploadImage } from 'src/scripts/api/apiRequestClientUploadImage'

interface Props {
  imageUrl: string
  setImageUrl: (imageUrl: string) => void
  alt?: boolean
}

export const AdminProductImage: FunctionComponent<Props> = ({ imageUrl, setImageUrl, alt }) => {
  const [className, setClassName] = useState('')

  const refInput = useRef(null)

  const handleChange: onChange = async (event) => {
    event.preventDefault()
    const file: File = refInput.current.files[0]
    if (file?.type) {
      const { imageUrl } = await apiRequestClientUploadImage(file)
      setImageUrl(imageUrl ?? '')
    }
  }

  return (
    <div className='column'>
      <div className={`preview ${alt ? 'alt' : ''} ${className}`}>
        <div className={`absolute ${imageUrl && imageUrl !== '' ? 'none' : ''}`}>
          <div>Кликнуть и выбрать</div>
          <div>Или перетащить в эту область</div>
        </div>
        <input
          ref={refInput}
          type='file'
          accept='image/*'
          onChange={handleChange}
          onDrop={() => setClassName('')}
          onDragEnter={() => setClassName('dropEnter')}
          onDragLeave={() => setClassName('')}
        />
      </div>

      {imageUrl && imageUrl !== '' && (
        <AdminButton onClick={() => setImageUrl('')} type='blue' faIcon={faTrash}>
          Удалить изображение
        </AdminButton>
      )}

      <style jsx>{
        /* language=CSS */ `
          .preview {
            background-image: ${imageUrl ? `url('${imageUrl}')` : 'white'};
          }
        `
      }</style>
      <style jsx>{
        /* language=CSS */ `
          .preview {
            position: relative;
            flex: 1 0;
            display: flex;
            height: 300px;
            width: 300px;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            margin: 4px auto;
            box-shadow: inset 0 0 20px 0 white, 0 0 20px 0 white;
          }

          .preview.alt {
            border-radius: 50%;
            height: 100px;
            width: 100px;
            font-size: 11px;
          }

          .preview.dropEnter {
            border: 2px dashed hsl(0, 0%, 0%);
          }

          .absolute {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: gray;
          }

          .absolute.none {
            display: none;
          }

          input {
            opacity: 0;
            background-color: white;
            width: 100%;
            height: 100%;
            cursor: pointer;
          }

          .column {
            flex: 1 0;
            display: flex;
          }
        `
      }</style>
    </div>
  )
}
