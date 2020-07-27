import { FunctionComponent } from 'react'
import { AppButton, AppButtonProps } from 'src/components/common/buttons/AppButton'

export const FooterButton: FunctionComponent<AppButtonProps> = props => (
  <>
    <AppButton className='footer-button' {...props} />

    <style jsx global>{
      /* language=CSS */ `
        .app-link-button.footer-button {
          margin: 10px 0;
          padding: 10px 0;
          border-radius: 12px;
          color: white;
          background-color: hsla(0, 0%, 0%, 0.15);
          box-shadow: 1px -1px 6px -3px hsl(200, 100%, 0%);
          text-transform: uppercase;
        }

        .app-link-button.footer-button:hover {
          box-shadow: inset -1px 1px 6px -3px hsl(200, 100%, 0%);
          background-color: hsla(0, 0%, 0%, 0.2);
        }

        .app-link-button.footer-button .inner {
          color: white;
        }
      `
    }</style>
  </>
)
