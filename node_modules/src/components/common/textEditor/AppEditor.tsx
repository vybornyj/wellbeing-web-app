import { FunctionComponent, useEffect, useState } from 'react'
import { useQuill } from 'react-quilljs'
import { apiRequestClientUploadImage } from 'src/scripts/api/apiRequestClientUploadImage'
import { getHtmlContentLength } from 'src/scripts/helpers/getHtmlContentLength'

interface Props {
  id: string
  initial: string
}

const AppEditor: FunctionComponent<Props> = ({ id, initial }) => {
  const [length, setLength] = useState(initial ? getHtmlContentLength(initial) : null)

  const { quill, quillRef } = useQuill({
    theme: 'snow',
    placeholder: '',
    formats: [
      'header',
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'list',
      'indent',
      'align',
      'color',
      'background',
      'clean',
      'link',
      'image',
      'video'
    ],
    modules: {
      toolbar: [
        [{ header: 1 }, { header: 2 }, 'bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        [{ align: '' }, { align: 'center' }, { align: 'right' }],
        [{ color: [] }, { background: [] }],
        ['clean'],
        ['link', 'image', 'video']
      ]
    }
  })

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(initial ?? '')

      quill.getModule('toolbar').addHandler('image', () => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async () => {
          const file: File = input.files[0]
          const { imageUrl } = await apiRequestClientUploadImage(file)
          const range = quill.getSelection()
          quill.insertEmbed(range.index, 'image', imageUrl)
        }
      })

      quill.on('text-change', () => {
        // quill.getLength() - считает перевод строки как символ
        setLength(getHtmlContentLength(quill.root.innerHTML))
        document.querySelector(id).innerHTML = quill.root.innerHTML
      })
    }
  }, [quill])

  return (
    <>
      <div ref={quillRef} />
      <div className='length'>{length}</div>

      <style jsx>{
        /* language=CSS */ `
          .length {
            text-align: right;
            margin: 5px 5px 0 0;
            color: hsl(0, 0%, 75%);
          }
        `
      }</style>
    </>
  )
}

export default AppEditor
