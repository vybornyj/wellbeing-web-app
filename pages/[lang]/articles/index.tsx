import { GetServerSideProps, NextPage } from 'next'
import { ArticleBreadcrumbs } from 'src/components/main/articles/ArticleBreadcrumbs'
import { ArticlesElement } from 'src/components/main/articles/ArticlesElement'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  error?: error
  lang?: lang
  articles?: Articles
  categories?: Categories
}

const Page: NextPage<Props> = ({ error, lang, articles }) => {
  if (error) return <TemplateMain lang={lang} error={error} />

  const title = lang === 'ru' ? 'Все статьи' : 'All Articles'

  return (
    <TemplateMain lang={lang} title={title}>
      <ArticleBreadcrumbs
        lang={lang}
        breadcrumbs={[
          { href: '', ru: 'Исследовательский проект Благополучие', en: 'Wellbeing Research Project' },
          { href: '/articles', ru: 'Статьи', en: 'Articles' }
        ]}
      />

      {articles ? articles.map((article, key) => <ArticlesElement lang={lang} article={article} key={key} />) : null}
    </TemplateMain>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: {
    ...(await apiRequestServer(res, '/api/articles/select', { lang: params?.lang })),
    lang: params?.lang
  }
})

export default Page
