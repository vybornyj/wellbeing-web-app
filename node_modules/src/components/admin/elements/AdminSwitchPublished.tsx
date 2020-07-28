import { FunctionComponent } from 'react'
import { AppButtonCheckbox } from 'src/components/common/buttonsCheckbox/AppButtonCheckbox'

interface Props {
  published: boolean
  setPublished: (published: boolean) => void
  falseText: string
  trueText: string
}

export const AdminSwitchPublished: FunctionComponent<Props> = ({ published, setPublished, falseText, trueText }) => (
  <div className='column1023row1024'>
    <AppButtonCheckbox type='dot' checked={!published} onClick={() => setPublished(false)}>
      {falseText}
    </AppButtonCheckbox>
    <AppButtonCheckbox type='dot' checked={!!published} onClick={() => setPublished(true)}>
      {trueText}
    </AppButtonCheckbox>
  </div>
)
