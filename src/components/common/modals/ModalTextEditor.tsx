import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import dynamic from 'next/dynamic'
import { FunctionComponent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { generateToken } from 'src/scripts/helpers/generateToken'

const AppEditor = dynamic(import('src/components/common/textEditor/AppEditor'), { ssr: false })

interface Props {
  titles: Array<string | undefined>
  content: any
  contentLength: any
  setContent: any
}

export const ModalTextEditor: FunctionComponent<Props> = ({ titles, content, contentLength, setContent }) => {
  const [container, setContainer] = useState(null)
  const [editorDomId, setEditorDomId] = useState(null)
  const [editorIsOpen, setEditorIsOpen] = useState(false)

  useEffect(() => {
    const div = document.createElement('div')
    div.id = `_modal_${generateToken()}`
    document.body.appendChild(div)
    setContainer(div)

    const div2 = document.createElement('div')
    const id = `_editor_${generateToken()}`
    div2.id = id
    div2.innerHTML = content
    div2.style.display = 'none'
    document.body.appendChild(div2)
    setEditorDomId(`#${id}`)

    return () => {
      div.remove()
      div2.remove()
    }
  }, [])

  const handleClose = () => {
    let html = document.querySelector(editorDomId).innerHTML
    html = html.split('<p><br></p>').join('')
    html = html.split(`<p class='ql-align-right'><br></p>`).join('')
    html = html.split(`<p class='ql-align-center'><br></p>`).join('')
    setContent(html)
    setEditorIsOpen(false)
  }

  const portal = () =>
    createPortal(
      <div className='modal-text-editor'>
        <div className='modal' onClick={(event) => event.stopPropagation()} role='link' tabIndex={0}>
          <div className='header'>
            <div className='titles'>
              {titles?.map((title, key) => (
                <div key={key}>{title}</div>
              ))}
            </div>
            <div className='icon' onClick={handleClose} role='link' tabIndex={0}>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
          <AppEditor id={editorDomId} initial={content} />
        </div>

        <style jsx global>{
          /* language=CSS */ `
            body {
              overflow: hidden;
            }

            #__next {
              filter: blur(2px);
            }
          `
        }</style>

        <style jsx>{
          /* language=CSS */ `
            .modal-text-editor {
              z-index: 41;
              position: fixed;
              top: 0;
              right: 0;
              bottom: -100px;
              left: 0;
              padding-bottom: 200px;

              background: hsla(0, 0%, 100%, 0.95);
              overflow: hidden scroll;
            }

            .modal {
              max-width: 1200px;
              cursor: initial;
              margin: 0 auto;
            }

            .header {
              height: 40px;
              width: 100%;
              background: hsl(0, 0%, 27%);
              display: flex;
            }

            .icon {
              width: 50px;
              height: 40px;
              cursor: pointer;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 25px;
              color: hsl(0, 0%, 75%);
            }

            .titles {
              align-items: center;
              justify-content: center;
              display: flex;
              width: 100%;
              flex-direction: column;
              font-size: 15px;
              color: white;
              line-height: 1.2;
            }
          `
        }</style>
      </div>,
      container,
    )

  return (
    <>
      <AdminButton
        onClick={() => {
          setEditorIsOpen(true)
        }}
        type='blue'
        faIcon={faPen}
      >{`${titles ? titles[0] : ''} (${contentLength})`}</AdminButton>
      {editorIsOpen && container && editorDomId ? portal() : null}
    </>
  )
}
