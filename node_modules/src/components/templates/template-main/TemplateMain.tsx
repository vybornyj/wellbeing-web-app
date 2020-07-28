import { FunctionComponent } from 'react'
import { TemplateMainFooter } from 'src/components/templates/template-main/TemplateMainFooter'
import { TemplateMainHeader } from 'src/components/templates/template-main/TemplateMainHeader'
import { TemplateHead } from 'src/components/templates/TemplateHead'

interface Props {
  error?: error
  lang?: lang
  title?: string
  titles?: {
    ru: string
    en: string
  }
  isMainPage?: boolean
}

export const TemplateMain: FunctionComponent<Props> = ({ lang = 'ru', title, titles, isMainPage, error, children }) => {
  return (
    <>
      <div className='background' />

      <TemplateHead title={title} titles={titles} lang={lang} />

      <TemplateMainHeader lang={lang} isMainPage={!!isMainPage} />

      <main>{error ? <h3>Ошибка 404: Страница не существует</h3> : children}</main>

      <TemplateMainFooter lang={lang} />

      <style jsx>{
        /* language=CSS */ `
          main {
            max-width: 1200px;
            margin: auto;
            padding: 50px 20px;
          }
        `
      }</style>

      <style jsx global>{
        /* language=CSS */ `
          body {
            background: hsl(140, 60%, 90%);
          }
          #__background {
            background: radial-gradient(ellipse at center, hsl(60, 100%, 95%) 0%, hsl(60, 100%, 95%) 35%, hsl(180, 60%, 80%) 100%) no-repeat;
            background-origin: border-box;
          }
        `
      }</style>
    </>
  )
}
