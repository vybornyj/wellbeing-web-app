import { FunctionComponent } from 'react'
import { AdminSideMenuButton } from 'src/components/common/buttons/AdminSideMenuButton'
import { menuItems } from 'src/components/templates/template-user/templateUserMenuItems'

interface Props {
  menuItems?: menuItems
  lang?: lang
  withLangPrefix?: boolean
}

export const TemplateAdminUserSideMenu: FunctionComponent<Props> = ({ menuItems, withLangPrefix, lang }) => (
  <>
    {menuItems?.map(({ type, langPrefix, ...props }, key) =>
      type === 'button' ? (
        <AdminSideMenuButton {...props} withLangPrefix={langPrefix ?? withLangPrefix} lang={lang} key={key} />
      ) : type === 'title' ? (
        <hr key={key} />
      ) : null
    )}

    <style jsx>{
      /* language=CSS */ `
        hr {
          margin: 10px 75px;
          border-color: transparent;
        }

        hr:first-child {
          /*display: none;*/
        }
      `
    }</style>
  </>
)
