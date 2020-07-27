import { GetServerSideProps, NextPage } from 'next'
import { ArticleBreadcrumbs } from 'src/components/main/articles/ArticleBreadcrumbs'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  lang?: lang
  article?: Article
  categories?: Categories
}

const Page: NextPage<Props> = ({ error, lang, article }) => {
  if (error) return <TemplateMain lang={lang} error={error} />

  const title = lang === 'ru' ? article?.titleRu : article?.titleEn
  const content = lang === 'ru' ? article?.contentRu : article?.contentEn

  return (
    <TemplateMain lang={lang} title={title}>
      <ArticleBreadcrumbs
        lang={lang}
        breadcrumbs={[
          { href: '/', ru: 'Исследовательский проект Благополучие', en: 'Wellbeing Research Project' },
          { href: '/articles', ru: 'Статьи', en: 'Articles' },
          { href: `/articles/[url]`, as: `/articles/${article?.url}`, ru: title, en: title }
        ]}
      />
      <h2>{title}</h2>
      <article className='ql-editor' dangerouslySetInnerHTML={{ __html: content ?? '' }} />

      <style jsx>{
        /* language=CSS */ `
          h2 {
            background-image: url(https://static.wellbeing-research.ru/categories/news2.jpg);
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin: 0 -20px 0 -20px;
            padding: 50px 25px;
            background-position: center;
            background-size: cover;
            text-shadow: 1px 2px 4px black;
            color: white;
            font-size: 28px;
            box-shadow: 1px 2px 4px 0 hsl(0, 0%, 75%);
          }

          article {
            background: white;
            margin: 0 -20px 0 -20px;
            padding: 10px 20px;
            box-shadow: 1px 2px 4px 0 hsl(0, 0%, 75%);
          }
        `
      }</style>
    </TemplateMain>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: {
    ...(await apiRequestServer(res, '/api/articles/select', { lang: params?.lang, url: params?.url, limit: 1 })),
    lang: params?.lang
  }
})

export default Page
