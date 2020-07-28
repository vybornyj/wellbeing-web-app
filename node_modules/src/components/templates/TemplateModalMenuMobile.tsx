import { FunctionComponent } from 'react'
import { ModalMenuMobileButton } from 'src/components/common/buttons/ModalMenuMobileButton'
import { AppModal } from 'src/components/common/modals/AppModal'
import { menuItems } from 'src/components/templates/template-user/templateUserMenuItems'

interface Props {
  lang?: lang
  isOpen?: boolean
  closing?: onClick
  menuItems?: menuItems
  withLangPrefix?: boolean
}

export const TemplateModalMenuMobile: FunctionComponent<Props> = ({ lang, isOpen, closing, menuItems, withLangPrefix }) => {
  return (
    <AppModal isOpen={isOpen} closing={closing}>
      <div className='section' onClick={closing} role='link' tabIndex={0}>
        {menuItems?.map(({ type, langPrefix, ...props }, key) =>
          type === 'button' ? (
            <ModalMenuMobileButton {...props} lang={lang} withLangPrefix={langPrefix ?? withLangPrefix} key={key} />
          ) : type === 'title' ? (
            <div className='title' {...props} lang={lang} key={key} />
          ) : null
        )}
      </div>

      <style jsx>{
        /* language=CSS */ `
          .section {
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            box-shadow: 0 0 30px 0 hsl(200, 100%, 25%);
            background: linear-gradient(60deg, hsla(140, 55%, 50%, 0.7), hsla(220, 55%, 50%, 0.7));
            padding: 5px;
          }

          .title {
            color: hsla(0, 0%, 0%, 0.5);
            display: flex;
            justify-content: center;
            font-weight: bold;
            margin: 4px 0 2px 0;
          }
        `
      }</style>
    </AppModal>
  )
}
