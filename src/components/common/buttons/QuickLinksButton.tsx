import { FunctionComponent } from 'react'
import { AppButton, AppButtonProps } from 'src/components/common/buttons/AppButton'

export const QuickLinksButton: FunctionComponent<AppButtonProps> = (props) => {
  return (
    <>
      <AppButton className='quick-links-button' {...props} />

      <style jsx global>{
        /* language=CSS */ `
          .app-link-button.quick-links-button {
            padding: 14px 10px;
            margin: 8px 0;
            width: 100%;
            background: white;
            color: hsl(240, 20%, 40%);
            border-radius: 8px;
            box-shadow: 0 0 1px 1px white, inset 0 0 1px 1px white;
            font-weight: bold;
          }

          .app-link-button.quick-links-button:hover {
            background: hsla(0, 0%, 0%, 0.1);
            color: white;
          }
        `
      }</style>
    </>
  )
}
