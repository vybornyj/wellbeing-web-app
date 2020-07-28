import { FunctionComponent, useRef } from 'react'
import { HorizontalBlocksElement } from 'src/components/main/horizontalBlocks/HorizontalBlocksElement'

interface Props {
  elements?: {
    title: string
    href: string
    as: string
    imageUrl: string
  }[]
}

export const HorizontalBlocksInner: FunctionComponent<Props> = ({ elements }) => {
  const ref = useRef(null)

  if (ref.current) {
    ref.current.addEventListener('wheel', event => {
      event.preventDefault()
      ref.current.scrollTo({
        top: 0,
        left: ref.current.scrollLeft + event.deltaY / 5,
        behavior: 'smooth'
      })
    })
  }

  return (
    <div className='place'>
      <div className='overflow'>
        <div ref={ref} className='scroll'>
          <div className='cards'>
            {elements.map((element, key) => (
              <HorizontalBlocksElement {...element} key={key} />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{
        /* language=CSS */ `
          .place {
            height: 180px;
          }

          .overflow {
            position: absolute;
            right: 0;
            left: 0;
            height: 170px;
            overflow: hidden;
            transition: var(--app-transition);
          }

          .overflow:hover {
            background: hsl(172, 100%, 87%);
            box-shadow: 0 0 4px -1px hsl(172, 46%, 34%);
          }

          .scroll {
            position: absolute;
            top: 0;
            right: 0;
            bottom: -20px;
            left: 0;
            overflow: scroll hidden;
            display: flex;
          }

          .cards {
            display: flex;
            padding: 0 25px 0 10px;
          }
        `
      }</style>
    </div>
  )
}
