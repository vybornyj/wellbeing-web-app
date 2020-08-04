import { renderPrettyUtcDate } from 'deus-date'
import getConfig from 'next/config'
import { FunctionComponent } from 'react'
import { TemplateAdminUser } from 'src/components/templates/template-admin-user/TemplateAdminUser'
import { templateAdminMenuItems } from 'src/components/templates/template-admin/templateAdminMenuItems'

const { publicRuntimeConfig }: GetConfig = getConfig()

interface Props {
  error?: error
  title?: string
}

export const TemplateAdmin: FunctionComponent<Props> = ({ error, title, children }) => {
  return (
    <TemplateAdminUser
      error={error}
      lang='ru'
      title={title}
      titleBase='Админка'
      template='admin'
      menuItems={templateAdminMenuItems}
      img='/images/template/admin-background.jpg'
      img2='/images/template/fabric_plaid.png'
      asideFooter={`Версия ${publicRuntimeConfig.RUNTIME_VERSION} · ${renderPrettyUtcDate(publicRuntimeConfig.RUNTIME_BUILD)}`}
      withLangPrefix={false}
    >
      {children}
    </TemplateAdminUser>
  )
}
