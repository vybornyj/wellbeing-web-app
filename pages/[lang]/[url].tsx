import { GetServerSideProps, NextPage } from 'next'
import { ArticleBreadcrumbs } from 'src/components/main/articles/ArticleBreadcrumbs'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  lang?: lang
  page?: Page
}

const Page: NextPage<Props> = ({ lang, page, error }) => {
  if (error) return <TemplateMain lang={lang} error={error} />

  const title = lang === 'ru' ? page?.titleRu : page?.titleEn
  const content = lang === 'ru' ? page?.contentRu : page?.contentEn

  return (
    <TemplateMain lang={lang} title={title}>
      <ArticleBreadcrumbs
        lang={lang}
        breadcrumbs={[
          { href: '', ru: 'Исследовательский проект Благополучие', en: 'Wellbeing Research Project' },
          { href: `/[url]`, as: `/${page?.url}`, ru: title, en: title },
        ]}
      />

      <article className='ql-editor' dangerouslySetInnerHTML={{ __html: content ?? '' }} />

      <style jsx>{
        /* language=CSS */ `
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
    ...(await apiRequestServer(res, '/api/pages/select', { lang: params?.lang, url: params?.url, limit: 1 })),
    lang: params?.lang,
  },
})

export default Page
