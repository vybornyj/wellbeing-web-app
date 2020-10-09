import { GetServerSideProps, NextPage } from 'next'
import { MainProduct } from 'src/components/main/products/MainProduct'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  lang: lang
  product: Product
  currency?: Currency
}

const Page: NextPage<Props> = ({ lang, product, currency }) => {
  const { titleRu, titleEn } = product
  const title = lang === 'ru' ? titleRu : titleEn

  return (
    <TemplateMain lang={lang} title={title}>
      <MainProduct lang={lang} product={product} currency={currency} />
    </TemplateMain>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: {
    lang: params?.lang,
    ...(await apiRequestServer(res, '/api/products/select', { lang: params?.lang, url: params?.url })),
    currency: await (await fetch('https://api.exchangeratesapi.io/latest')).json(),
  },
})

export default Page
