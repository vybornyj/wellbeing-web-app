import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useDispatch, useGlobal } from 'reactn'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { TemplateUser } from 'src/components/templates/template-user/TemplateUser'

interface Props {
  lang: lang
}

const Page: NextPage<Props> = ({ lang }) => {
  const router = useRouter()
  const [storeUser] = useGlobal('storeUser')
  const STORE_CLOSE_USER_SESSION = useDispatch('STORE_CLOSE_USER_SESSION')

  const title = lang === 'ru' ? 'Настройки' : 'Settings'

  const handleSessionClose = async () => {
    await router.push('/[lang]', `/${lang}`)
    await STORE_CLOSE_USER_SESSION()
  }

  return (
    <TemplateUser lang={lang} title={title}>
      <h3>{storeUser.email}</h3>
      <AdminButton onClick={handleSessionClose} en='Exit' ru='Выход' lang={lang} />
    </TemplateUser>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => ({
  props: { lang: params?.lang }
})

export default Page
