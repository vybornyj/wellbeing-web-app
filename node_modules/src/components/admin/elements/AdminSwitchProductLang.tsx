import { FunctionComponent } from 'react'
import { AppButtonCheckbox } from 'src/components/common/buttonsCheckbox/AppButtonCheckbox'

interface Props {
  productLang: 1 | 2 | 3
  setProductLang: (productLang: 1 | 2 | 3) => void
}

export const AdminSwitchProductLang: FunctionComponent<Props> = ({ productLang, setProductLang }) => (
  <div className='column1023row1024'>
    <AppButtonCheckbox type='dot' checked={productLang === 1} onClick={() => setProductLang(1)}>
      Только русский
    </AppButtonCheckbox>
    <AppButtonCheckbox type='dot' checked={productLang === 2} onClick={() => setProductLang(2)}>
      Только английский
    </AppButtonCheckbox>
    <AppButtonCheckbox type='dot' checked={productLang === 3} onClick={() => setProductLang(3)}>
      На выбор покупателя
    </AppButtonCheckbox>
  </div>
)
