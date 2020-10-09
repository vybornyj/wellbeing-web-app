import { GetServerSideProps, NextPage } from 'next'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'

interface Props {
  lang: lang
}

const Page: NextPage<Props> = ({ lang }) => {
  const title = lang === 'ru' ? 'Мои заказы' : 'My Orders'

  return <TemplateUser lang={lang} title={title} />
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: { lang: params?.lang },
})

export default Page
