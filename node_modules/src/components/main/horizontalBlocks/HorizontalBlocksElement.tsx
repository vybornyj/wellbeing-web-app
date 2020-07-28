import Link from 'next/link'
import { FunctionComponent } from 'react'

interface Props {
  title: string
  href: string
  as: string
  imageUrl: string
}

export const HorizontalBlocksElement: FunctionComponent<Props> = ({ title, href, as, imageUrl }) => {
  return (
    <Link href={href} as={as}>
      <a>
        {title}

        <style jsx>{
          /* language=CSS */ `
            a {
              background-image: url(${imageUrl});
              background-color: hsla(0, 0%, 0%, 0.1);
              background-position: center;
              background-size: cover;
              width: 200px;
              height: 150px;
              padding: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              border-radius: 8px;
              font-size: 24px;
              text-shadow: 1px 2px 3px black, 1px 2px 6px black, 1px 2px 9px black;
              color: white;
              box-shadow: 0 0 2px 0 hsl(180, 90%, 30%);
              margin: 10px;
              transition: var(--app-transition);
            }

            a:hover {
              color: white;
              box-shadow: 0 0 2px 1px hsl(180, 90%, 30%), 0 0 0 6px hsl(0, 0%, 100%), 0 0 2px 7px hsl(180, 90%, 30%);
            }
          `
        }</style>
      </a>
    </Link>
  )
}
