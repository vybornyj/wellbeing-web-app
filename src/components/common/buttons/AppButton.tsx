import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

export interface AppButtonProps {
  // [обязательно] событие или ссылка: onClick | href | href + as
  onClick?: onClick
  href?: string // например: /[user]/chart/[chart]
  as?: string // например: /123456/chart/2345678

  onMouseEnter?: onMouseEnter
  onContextMenu?: onContextMenu

  // [обязательно] текста кнопки: children | ru + en
  ru?: React.ReactElement | string
  en?: React.ReactElement | string

  // withLangPrefix = false, нужен чтобы в ссылках не добавлялся '/[lang]/...'
  withLangPrefix?: boolean

  // [обязательно вместе с withLangPrefix = false или ru + en]
  lang?: lang

  className?: string
  justifyContent?: 'flex-start' | 'flex-end'
  flex?: string
  listItem?: true
  faIcon?: IconProp
}

export const AppButton: FunctionComponent<AppButtonProps> = (props) => {
  const router = useRouter()

  const {
    onClick,
    onMouseEnter,
    onContextMenu,
    children,
    ru,
    en,
    withLangPrefix = true,
    lang,
    justifyContent = 'center',
    flex = '1 0',
    listItem = false,
    faIcon,
  } = props

  let { href = '/', as, className = '' } = props

  // HREF AS
  as = as ?? href

  if (withLangPrefix && lang) {
    href = `/[lang]${href}`
    as = `/${props.lang}${as}`
  }

  // CLASSNAME
  className += ' app-link-button'

  if (router.asPath === as) {
    className += ' current'
  }

  const splitAsPath = router.asPath.split('/')

  if (router.asPath === as || (!withLangPrefix && as.includes(splitAsPath[2])) || (withLangPrefix && as.includes(splitAsPath[3]))) {
    className += ' active'
  }

  // INNER
  const renderInner = () => (
    <div className='inner'>
      {faIcon && <FontAwesomeIcon icon={faIcon} />}
      {children ?? (lang === 'ru' ? ru : en)}
      <style jsx>{
        /* language=CSS */ `
          .inner {
            display: flex;
            align-items: center;
            text-align: center;
            width: ${listItem ? '100%' : 'initial'};
            justify-content: ${listItem ? 'space-between' : 'center'};
          }
        `
      }</style>
    </div>
  )

  return (
    <>
      {onClick ? (
        <div className={className} onClick={onClick} onMouseEnter={onMouseEnter} onContextMenu={onContextMenu} role='link' tabIndex={0}>
          {renderInner()}
        </div>
      ) : href.includes('http://') || href.includes('https://') || href.includes('mailto:') || href.includes('tel:') ? (
        <a href={href} className={className} onMouseEnter={onMouseEnter} onContextMenu={onContextMenu} target='_blank' rel='noreferrer'>
          {renderInner()}
        </a>
      ) : (
        <Link href={href} as={as}>
          <a className={className} onMouseEnter={onMouseEnter} onContextMenu={onContextMenu}>
            {renderInner()}
          </a>
        </Link>
      )}

      <style jsx>{
        /* language=CSS */ `
          .app-link-button {
            display: flex;
            justify-content: ${justifyContent};
            align-items: center;
            text-align: center;

            cursor: pointer;
            position: relative;
            transition: var(--app-transition);
            flex: ${flex};
            font-size: 16px;
          }
          .app-link-button :global(svg) {
            margin: 2px 10px;
            color: hsl(210, 40%, 40%);
            transition: var(--app-transition);
            width: 16px;
            height: 16px;
          }
        `
      }</style>
    </>
  )
}
