import { FunctionComponent } from 'react'
import { AppButton, AppButtonProps } from 'src/components/common/buttons/AppButton'

export const HeaderButton: FunctionComponent<AppButtonProps> = ({ flex, ...props }) => (
  <>
    <AppButton className='header-button' flex={flex ?? 'none'} {...props} />

    <style jsx global>{
      /* language=CSS */ `
        .app-link-button.header-button {
          height: 48px;
          min-width: 52px;
          margin: 1px 0;
          color: white;
          background: transparent;
          font-size: 18px;
          font-weight: bold;
          padding: 0 12px;
          line-height: 1;
        }

        .app-link-button.header-button:hover {
          color: black;
          background: white;
        }

        .app-link-button.header-button:hover .inner {
          background: -webkit-linear-gradient(hsl(191, 88%, 33%), hsl(88, 70%, 40%));
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
        }

        .app-link-button.header-button svg {
          color: white;
        }

        .app-link-button.header-button:hover svg {
          color: hsl(88, 70%, 40%);
        }
      `
    }</style>
  </>
)
