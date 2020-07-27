import { FunctionComponent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { generateToken } from 'src/scripts/helpers/generateToken'

interface Props {
  isOpen: boolean
  closing: onClick
}

export const AppModalAdmin: FunctionComponent<Props> = ({ isOpen, closing, children }) => {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    const div = document.createElement('div')
    div.id = `_modal_${generateToken()}`
    document.body.appendChild(div)
    setContainer(div)

    return () => {
      div.remove()
    }
  }, [])

  if (!isOpen || !container) return null
  return createPortal(
    <div className='modal-text-editor admin-template' onClick={closing} role='link' tabIndex={0}>
      <div className='modal' onClick={event => event.stopPropagation()} role='link' tabIndex={0}>
        {children}
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
            padding: 0 10px 200px 10px;

            background: hsla(0, 0%, 100%, 0.9);
            overflow: hidden scroll;
            cursor: pointer;
          }

          .modal {
            background-color: white;
            max-width: 600px;
            min-height: 100px;
            cursor: initial;
            margin: 100px auto 200px auto;
            border-radius: 6px;
            padding: 12px 8px;
            box-shadow: 0 0 4px -1px gray;
          }
        `
      }</style>
    </div>,
    container
  )
}
