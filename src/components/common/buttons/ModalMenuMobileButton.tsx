import { FunctionComponent } from 'react'
import { AppButton, AppButtonProps } from 'src/components/common/buttons/AppButton'

export const ModalMenuMobileButton: FunctionComponent<AppButtonProps> = (props) => (
  <>
    <AppButton className='modal-menu-mobile-button' {...props} />

    <style jsx global>{
      /* language=CSS */ `
        .app-link-button.modal-menu-mobile-button {
          padding: 10px 0;
          font-weight: bold;
          border-radius: 12px;
          margin: 8px 5px;
          box-shadow: 1px -1px 6px -3px hsl(200, 100%, 0%);
          background-color: hsla(0, 0%, 0%, 0.15);
          text-transform: uppercase;
        }

        .app-link-button.modal-menu-mobile-button:hover {
          box-shadow: inset -1px 1px 6px -3px hsl(200, 100%, 0%);
          background-color: hsla(0, 0%, 0%, 0.2);
        }

        .app-link-button.modal-menu-mobile-button .inner {
          color: white;
        }
      `
    }</style>
  </>
)
