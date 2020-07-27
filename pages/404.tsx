import { NextPage } from 'next'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'

const Page: NextPage = () => {
  const lang: lang = navigator?.language?.includes('ru') ? 'ru' : 'en'

  return (
    <TemplateMain lang={lang} title='404'>
      <p>{lang === 'ru' ? 'Запрашиваемая страница не существует' : 'The requested page does not exist'}</p>
    </TemplateMain>
  )
}

export default Page
