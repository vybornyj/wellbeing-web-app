import Tippy from '@tippyjs/react'
import { NextPage } from 'next'
import { useDispatch } from 'reactn'
import { TemplateAdmin } from 'src/components/templates/template-admin/TemplateAdmin'

const Page: NextPage = () => {
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  return (
    <TemplateAdmin title='Тесты'>
      <h3>Всплывающие уведомления</h3>
      <div onClick={() => STORE_SET_ALERT_POPUP({ inner: 'Выполнено!' })} role='link' tabIndex={0}>
        Выполнено!
      </div>
      <div onClick={() => STORE_SET_ALERT_POPUP({ type: 'warn', inner: 'Предостережение' })} role='link' tabIndex={0}>
        Предостережение!
      </div>
      <div onClick={() => STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Ошибка' })} role='link' tabIndex={0}>
        Ошибка!
      </div>
      <div onClick={() => STORE_SET_ALERT_POPUP({ type: 'info', inner: 'Информация' })} role='link' tabIndex={0}>
        Информация!
      </div>

      <h3>Всплывающие подсказки</h3>

      <Tippy content='Подсказка' animation='scale-extreme'>
        <div>Всплвающавя подсказка при наведении</div>
      </Tippy>
      <Tippy content='Подсказка' trigger='click' animation='scale'>
        <div>Всплвающавя подсказка при клике</div>
      </Tippy>

      <style jsx>{
        /* language=CSS */ `
          div {
            padding: 8px;
            margin: 8px;
            background-color: white;
            border-radius: 6px;
            cursor: pointer;
            color: black;
          }
        `
      }</style>
    </TemplateAdmin>
  )
}

export default Page
