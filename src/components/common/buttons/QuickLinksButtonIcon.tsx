import { FunctionComponent } from 'react'
import { AppButton, AppButtonProps } from 'src/components/common/buttons/AppButton'

export const QuickLinksButtonIcon: FunctionComponent<AppButtonProps> = props => {
  return (
    <>
      <AppButton className='quick-links-button-icon' {...props} />

      <style jsx global>{
        /* language=CSS */ `
          .app-link-button.quick-links-button-icon {
            width: 60px;
            height: 60px;
            background: hsla(0, 0%, 0%, 0.1);
            border-radius: 8px;
            margin: 0 8px;
            box-shadow: 0 0 10px -5px black;
          }

          .app-link-button.quick-links-button-icon:hover {
            /*width: 60px;*/
            /*height: 60px;*/
          }

          .app-link-button.quick-links-button-icon svg {
            color: white;
            width: 32px;
            height: 32px;
          }

          .app-link-button.quick-links-button-icon:hover svg {
            width: 36px;
            height: 36px;
          }
        `
      }</style>
    </>
  )
}
