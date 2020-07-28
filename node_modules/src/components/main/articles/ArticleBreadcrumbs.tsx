import Link from 'next/link'
import { Fragment, FunctionComponent } from 'react'

interface Props {
  lang?: lang
  breadcrumbs: {
    href: string
    as?: string
    ru?: string
    en?: string
  }[]
}

export const ArticleBreadcrumbs: FunctionComponent<Props> = ({ lang = 'ru', breadcrumbs }) => {
  return (
    <section>
      {breadcrumbs
        ? breadcrumbs.map(({ href, as, ru, en }, key) => (
            <Fragment key={key}>
              <Link href={`/[lang]${href}`} as={`/${lang}${as ?? href}`}>
                <a>{lang === 'ru' ? ru : en}</a>
              </Link>
              <span> / </span>
            </Fragment>
          ))
        : null}

      <style jsx>{
        /* language=CSS */ `
          section {
            margin: -25px 0 25px 0;
            text-transform: uppercase;
            font-size: 14px;
          }

          a:hover {
            text-decoration: underline;
          }

          span:last-of-type {
            display: none;
          }
        `
      }</style>
    </section>
  )
}
