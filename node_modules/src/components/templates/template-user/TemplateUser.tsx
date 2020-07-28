import getConfig from 'next/config'
import { FunctionComponent } from 'react'
import { TemplateAdminUser } from 'src/components/templates/template-admin-user/TemplateAdminUser'
import { templateUserMenuItems } from 'src/components/templates/template-user/templateUserMenuItems'

const { publicRuntimeConfig }: GetConfig = getConfig()

interface Props {
  error?: error
  lang?: lang
  title?: string
}

export const TemplateUser: FunctionComponent<Props> = ({ error, lang, title, children }) => {
  return (
    <TemplateAdminUser
      error={error}
      lang={lang}
      title={title}
      titleBase='Личный Кабинет'
      template='user'
      menuItems={templateUserMenuItems}
      img='/images/template/user-background.jpg'
      img2='/images/template/beige-tiles.png'
      asideFooter={publicRuntimeConfig.RUNTIME_VERSION}
      withLangPrefix={true}
    >
      {children}
    </TemplateAdminUser>
  )
}
