import { GetServerSideProps, NextPage } from 'next'
import { MainProducts } from 'src/components/main/products/MainProducts'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  lang: lang
  products: Products
  currency?: Currency
}

const Page: NextPage<Props> = ({ lang, products, currency }) => {
  const title = lang === 'ru' ? 'Магазин' : 'Prices'

  return (
    <TemplateMain lang={lang} title={title}>
      <MainProducts lang={lang} products={products} currency={currency} />
    </TemplateMain>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: {
    lang: params?.lang,
    ...(await apiRequestServer(res, '/api/products/selects')),
    currency: await (await fetch('https://api.exchangeratesapi.io/latest')).json()
  }
})

export default Page
