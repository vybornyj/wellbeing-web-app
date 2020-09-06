import { FunctionComponent } from 'react'
import { AppButton, AppButtonProps } from 'src/components/common/buttons/AppButton'

export const AdminSideMenuButton: FunctionComponent<AppButtonProps> = (props) => (
  <>
    <AppButton className='admin-side-menu-button' {...props} justifyContent='flex-start' />

    <style jsx global>{
      /* language=CSS */ `
        .app-link-button.admin-side-menu-button {
          background: transparent;
          color: white;
          font-size: 18px;
          border-radius: 12px;
          padding: 6px 0 6px 6px;
          margin: 5px 15px;
        }

        .app-link-button.admin-side-menu-button:hover {
          background: hsla(190, 100%, 80%, 0.15);
          color: white;
        }

        .app-link-button.admin-side-menu-button.active:hover {
          background: transparent;
        }

        .app-link-button.admin-side-menu-button.active {
          color: hsl(190, 100%, 80%);
        }

        .app-link-button.admin-side-menu-button.active {
          box-shadow: 0 0 8px -1px hsl(190, 100%, 80%);
        }

        .app-link-button.admin-side-menu-button svg {
          color: white;
          width: 20px;
          height: 20px;
          margin: 2px 15px 2px 10px;
        }

        .app-link-button.admin-side-menu-button.active svg {
          color: hsl(190, 100%, 80%);
        }
      `
    }</style>
  </>
)
