import { GetServerSideProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'reactn'
import { NewPasswordForm } from 'src/components/common/layouts/LayoutNewPassword/NewPasswordForm'
import { TemplateMain } from 'src/components/templates/template-main/TemplateMain'
import { TemplateSolo } from 'src/components/templates/template-solo/TemplateSolo'
import { apiRequestServer } from 'src/scripts/api/apiRequestServer'

interface Props {
  lang: lang
  token: string

  success?: true
  type?: 'registration' | 'resetPassword'
  email?: User['email']
  userId?: User['userId']
  error?: error
}

const Page: NextPage<Props> = ({ lang, token, error, success, type, email, userId }) => {
  const router = useRouter()
  const STORE_SET_USER = useDispatch('STORE_SET_USER')

  const [doReturn, setDoReturn] = useState<'' | 'undefinedToken' | 'resetPassword'>(error ? 'undefinedToken' : '')

  useEffect(() => {
    if (!error && success) {
      if (type === 'registration' && email) {
        STORE_SET_USER({ email, isAdmin: false })
        router.push('/[lang]/my', `/${lang}/my`)
      } else if (type === 'resetPassword') {
        STORE_SET_USER({})
        setDoReturn('resetPassword')
      }
    } else {
      setDoReturn('undefinedToken')
    }
  }, [])

  if (doReturn === 'undefinedToken') {
    return (
      <TemplateMain lang={lang} title={lang === 'ru' ? 'Проверка токена' : 'Token Check'}>
        <h2>{lang === 'ru' ? 'Токен не действителен' : 'Token is not valid'}</h2>
        <h3>{lang === 'ru' ? 'Вероятные причины:' : 'Probable reasons:'}</h3>
        <p>{lang === 'ru' ? 'Вы получили письмо с токеном более 48 часов назад.' : 'You received an email with a token more than 48 hours ago.'}</p>
        <p>{lang === 'ru' ? 'Вы уже использовали этот одноразовый токен.' : 'You have already used this one-time token.'}</p>

        <h3>{lang === 'ru' ? 'Что делать?' : 'What to do?'}</h3>
        <p>
          {lang === 'ru'
            ? 'Вы можете повторить процедуру, и мы вышлем вам новый токен.'
            : 'You can repeat the procedure, and we will send you a new token.'}
        </p>
      </TemplateMain>
    )
  }
  if (doReturn === 'resetPassword') {
    return (
      <TemplateSolo lang={lang} title={lang === 'ru' ? 'Смена пароля' : 'Change Password'}>
        <NewPasswordForm userId={userId} token={token} email={email} lang={lang} />
      </TemplateSolo>
    )
  }
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res, params }) => ({
  props: {
    lang: params?.lang,
    token: params?.token,
    ...(await apiRequestServer(res, '/api/tokens/select', {
      token: String(params?.token)
    }))
  }
})

export default Page
