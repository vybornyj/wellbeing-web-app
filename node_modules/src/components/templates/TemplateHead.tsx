import getConfig from 'next/config'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FunctionComponent } from 'react'

const { publicRuntimeConfig }: GetConfig = getConfig()

interface Props {
  lang?: lang
  title?: string
  titles?: {
    ru: string
    en: string
  }
  titleBase?: string
}

const descriptions = {
  ru: 'Исследовательский проект Благополучие',
  en: 'Wellbeing Research Project'
}

export const TemplateHead: FunctionComponent<Props> = ({ lang = 'ru', title, titles, titleBase }) => {
  const _description = descriptions[lang]
  const _titleBase = titleBase ?? _description
  const _title = titles ? titles[lang] : title ? `${title} - ${_titleBase}` : _titleBase

  const router = useRouter()
  const canonicalHref = `${publicRuntimeConfig.URL_APP}${router.asPath}`

  return (
    <Head>
      <title>{_title}</title>
      <meta name='description' content={_description} />
      <link rel='canonical' href={canonicalHref} />
    </Head>
  )
}
