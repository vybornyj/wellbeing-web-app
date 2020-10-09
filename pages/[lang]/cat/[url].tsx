import { GetServerSideProps, NextPage } from 'next'
import { ArticleBreadcrumbs } from 'src/components/main/articles/ArticleBreadcrumbs'
import { ArticlesElement } from 'src/components/main/articles/ArticlesElement'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  lang?: lang
  url?: string
  articles?: Articles
  categories?: Categories
}

const Page: NextPage<Props> = ({ error, lang, url, articles, categories }) => {
  if (error) return <TemplateMain lang={lang} error={error} />

  const category = categories?.find((category) => category.url === url)
  const title = lang === 'ru' ? category?.titleRu : category?.titleEn

  return (
    <TemplateMain lang={lang} title={title}>
      <ArticleBreadcrumbs
        lang={lang}
        breadcrumbs={[
          { href: '', ru: 'Исследовательский проект Благополучие', en: 'Wellbeing Research Project' },
          { href: '/articles', ru: 'Статьи', en: 'Articles' },
          { href: `/cat/[url]`, as: `/cat/${category?.url}`, ru: category?.titleRu, en: category?.titleEn },
        ]}
      />

      {articles?.map((article, key) => (
        <ArticlesElement lang={lang} article={article} key={key} />
      ))}
    </TemplateMain>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: {
    ...(await apiRequestServer(res, '/api/articles/select', { lang: params?.lang, categoryUrl: params?.url })),
    lang: params?.lang,
    url: params?.url,
  },
})

export default Page
