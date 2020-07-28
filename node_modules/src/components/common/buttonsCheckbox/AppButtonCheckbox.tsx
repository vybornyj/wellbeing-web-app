import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FunctionComponent, useState } from 'react'
import { AppButton, AppButtonProps } from 'src/components/common/buttons/AppButton'
import { getRandomInteger } from 'src/scripts/helpers/getRandomInteger'

interface Props extends AppButtonProps {
  checked: boolean
  type?: 'check' | 'dot'
}

export const AppButtonCheckbox: FunctionComponent<Props> = ({ checked, type = 'check', ...props }) => {
  const [h, setH] = useState(0)
  const faIcon = type === 'check' ? (checked ? faCheck : faMinus) : checked ? faCheck : null

  return (
    <>
      <AppButton className={`admin-button-checkbox ${checked}`} onMouseEnter={() => setH(getRandomInteger(0, 359))} faIcon={faIcon} {...props} />

      <style jsx global>{
        /* language=CSS */ `
          .admin-button-checkbox {
            color: black;
            background: hsla(0, 0%, 100%, 0.75);
            border-radius: 4px;
            min-height: 42px;
            margin: 4px;
            padding: 4px 10px;
            border: 1px solid transparent;
          }
          .admin-button-checkbox.true {
            color: white;
            background: hsla(210, 60%, 70%, 0.75);
          }

          .admin-button-checkbox:hover {
            background: hsla(${h}, 50%, 85%, 0.75);
            border: 1px solid hsl(0, 0%, 60%);
          }
          .admin-button-checkbox.true:hover {
            background: hsla(210, 50%, 60%, 0.75);
            border: 1px solid transparent;
          }

          .admin-button-checkbox .inner {
            flex-wrap: wrap;
          }
          .app-link-button.admin-button-checkbox.true svg {
            color: white;
          }
        `
      }</style>
    </>
  )
}
