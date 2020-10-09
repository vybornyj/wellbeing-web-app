import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { useGlobal } from 'reactn'
import { AuthorizationForm } from 'src/components/common/layouts/LayoutAuthorization/AuthorizationForm'
import { TemplateAdminUserSideMenu } from 'src/components/templates/template-admin-user/TemplateAdminUserSideMenu'
import { TemplateSolo } from 'src/components/templates/template-solo/TemplateSolo'
import { menuItems } from 'src/components/templates/template-user/templateUserMenuItems'
import { TemplateHead } from 'src/components/templates/TemplateHead'
import { TemplateModalMenuMobile } from 'src/components/templates/TemplateModalMenuMobile'

interface Props {
  error?: error
  lang?: lang
  title?: string
  titleBase: string
  template: 'admin' | 'user'
  menuItems: menuItems
  img: string
  img2: string
  asideFooter: string
  withLangPrefix: boolean
}

export const TemplateAdminUser: FunctionComponent<Props> = ({
  error,
  lang,
  title,
  titleBase,
  template,
  menuItems,
  img,
  img2,
  asideFooter,
  withLangPrefix,
  children,
}) => {
  const router = useRouter()
  const [storeUser] = useGlobal('storeUser')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  if (!storeUser.isDefined) {
    return null
  }

  if (!storeUser.isLogin) {
    return (
      <TemplateSolo lang={lang} title={title} titleBase={titleBase}>
        <AuthorizationForm lang={lang} />
      </TemplateSolo>
    )
  }

  if (template === 'admin') {
    if (!storeUser.isAdmin) {
      router.push('/')
      return null
    }
  }

  return (
    <div className='admin-user-template'>
      <TemplateHead title={title} titleBase={titleBase} lang={lang} />

      <TemplateModalMenuMobile
        menuItems={menuItems}
        lang={lang}
        isOpen={modalIsOpen}
        closing={() => setModalIsOpen(false)}
        withLangPrefix={withLangPrefix}
      />

      <aside>
        <div className='top'>
          <TemplateAdminUserSideMenu menuItems={menuItems} lang={lang} withLangPrefix={withLangPrefix} />
        </div>

        <div className='bottom'>{asideFooter}</div>
      </aside>

      <div className='right'>
        <header>
          <div className='title'>{error ? 'Ошибка 404: Страница не существует' : title ?? titleBase}</div>

          <div className='button' onClick={() => setModalIsOpen(true)} role='link' tabIndex={0}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </header>

        <main>{!error && children}</main>
      </div>

      <style jsx global>{
        /* language=CSS */ `
          body {
            background: hsl(210, 40%, 90%);
          }
          #__background {
            background: linear-gradient(30deg, hsla(210, 50%, 50%, 0.2), hsla(210, 50%, 50%, 0.2)), url(${img2});
          }
        `
      }</style>

      <style jsx>{
        /* language=CSS */ `
          .admin-user-template {
            display: flex;
          }

          aside {
            width: 200px;
            display: flex;
            flex-direction: column;
            background: linear-gradient(to right, hsla(0, 50%, 0%, 0.6), hsla(0, 50%, 0%, 0.6)), url(${img});
            background-size: cover;
            overflow: hidden auto;
            box-shadow: -5px 0 12px 5px black;
          }

          aside .top {
            flex: 1 0 auto;
          }

          aside .bottom {
            flex: 0 0 17px;
            font-size: 12px;
            color: white;
            text-align: center;
            padding: 30px 0 2px 0;
            opacity: 0.4;
          }

          .right {
            width: 100%;
            min-height: 100vh;
          }

          header {
            background-color: hsl(210, 40%, 80%);
            box-shadow: 0 0 4px -1px black;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          header .title {
            flex: 1 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          main {
            padding: 20px 15px 150px 15px;
          }

          @media screen and (max-width: 1023px) {
            aside {
              display: none;
            }

            .right {
              margin-left: 0;
            }

            header {
              position: fixed;
              top: 0;
              right: 0;
              left: 0;
              z-index: 10;
            }

            header .button {
              display: flex;
              align-items: center;
              justify-content: center;
              width: 50px;
              height: 40px;
              background-color: hsla(0, 0%, 0%, 0.05);
              cursor: pointer;
            }

            main {
              margin-top: 50px;
              padding: 20px 15px 150px 15px;
            }
          }

          @media screen and (min-width: 1024px) {
            aside {
              position: fixed;
              top: 0;
              bottom: 0;
              left: 0;
            }

            .right {
              margin-left: 200px;
            }

            header {
              position: static;
            }

            header .button {
              display: none;
            }

            main {
              margin-top: 0;
            }
          }
        `
      }</style>

      <style jsx global>{
        /* language=CSS */ `
          .admin-user-template h3 {
            background: -webkit-linear-gradient(hsl(210, 50%, 40%), hsl(180, 50%, 40%));
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            font-size: 22px;
            margin: 12px 10px 8px 10px;
          }

          .admin-user-template .button-title,
          .admin-user-template .button-badge {
            padding: 0 6px;
            margin: 3px 4px;
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .admin-user-template .button-title {
            height: 30px;
            margin: 3px 4px;
            box-shadow: 0 0 0 1px hsl(210, 40%, 80%);
            background: white;
            color: hsl(210, 40%, 20%);
          }

          .admin-user-template .button-badge {
            height: 24px;
            margin: 6px 4px;
            font-size: 12px;
            box-shadow: 0 0 0 1px hsl(0, 0%, 50%);
            background: hsl(210, 40%, 65%);
            color: white;
          }

          .admin-user-template .button-badge.cyan {
            background: hsl(190, 40%, 65%);
          }

          .admin-user-template .button-badge.blue {
            background: hsl(210, 40%, 65%);
          }

          .admin-user-template .button-badge.gray {
            background: hsl(0, 0%, 65%);
          }

          .admin-user-template .button-badge.yellow {
            background: hsl(40, 40%, 65%);
          }

          .admin-user-template .button-badge.red {
            background: hsl(10, 40%, 65%);
          }

          .admin-user-template .button-badge.green {
            background: hsl(100, 40%, 65%);
          }
        `
      }</style>
    </div>
  )
}
