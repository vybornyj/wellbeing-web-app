import { FunctionComponent, useState } from 'react'
import { AppButton, AppButtonProps } from 'src/components/common/buttons/AppButton'
import { getRandomInteger } from 'src/scripts/helpers/getRandomInteger'

interface Props extends AppButtonProps {
  type?: 'red' | 'blue' | 'green'
}

export const AdminButton: FunctionComponent<Props> = ({ type, ...props }) => {
  const [h, setH] = useState(0)

  return (
    <>
      <AppButton className={`admin-button ${type}`} onMouseEnter={() => setH(getRandomInteger(0, 359))} {...props} />

      <style jsx global>{
        /* language=CSS */ `
          .app-link-button.admin-button {
            color: black;
            background: hsla(0, 0%, 100%, 0.75);
            border-radius: 4px;
            min-height: 42px;
            margin: 4px;
            padding: 4px 10px;
            border: 1px solid transparent;
          }

          .app-link-button.admin-button.red {
            background: linear-gradient(60deg, hsla(330, 55%, 65%, 0.75), hsla(30, 55%, 65%, 0.75));
            color: white;
          }

          .app-link-button.admin-button.red:hover {
            background: linear-gradient(60deg, hsla(330, 50%, 60%, 0.75), hsla(30, 50%, 60%, 0.75));
            border: 1px solid transparent;
          }

          .app-link-button.admin-button.blue,
          .app-link-button.admin-button.current {
            background: hsla(210, 55%, 65%, 0.75);
            color: white;
          }

          .app-link-button.admin-button.blue:hover,
          .app-link-button.admin-button.current:hover {
            background: hsla(210, 50%, 60%, 0.75);
            border: 1px solid transparent;
          }

          .app-link-button.admin-button.green {
            background: linear-gradient(60deg, hsla(150, 55%, 65%, 0.75), hsla(210, 55%, 65%, 0.75));
            color: white;
          }

          .app-link-button.admin-button:hover {
            background: hsla(${h}, 50%, 85%, 0.75);
            border: 1px solid hsl(0, 0%, 60%);
          }

          .app-link-button.admin-button.green:hover {
            background: linear-gradient(60deg, hsla(150, 50%, 60%, 0.75), hsla(210, 50%, 60%, 0.75));
            border: 1px solid transparent;
          }

          .app-link-button.admin-button .inner {
            flex-wrap: wrap;
          }

          .app-link-button.admin-button.red svg,
          .app-link-button.admin-button.blue svg,
          .app-link-button.admin-button.green svg {
            color: white;
          }
        `
      }</style>
    </>
  )
}
