import { useRouter } from 'next/router'
import { FunctionComponent, useState } from 'react'
import { useDispatch } from 'reactn'
import { AuthorizationFormLoader } from 'src/components/common/layouts/LayoutAuthorization/AuthorizationFormLoader'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'

interface Props {
  userId?: User['userId']
  email?: User['email']
  token: string
  lang: lang
}

export const NewPasswordForm: FunctionComponent<Props> = ({ userId, email, token, lang }) => {
  const router = useRouter()
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const textsLang = {
    ru: {
      msgDefault: `Установка нового пароля для ${email}`,
      msgErrorInputPassword: 'Пароль должен быть от 6 до 32 символов',
      msgErrorUndefined: 'Неизвестная ошибка',
      submit: 'Установить новый пароль'
    },
    en: {
      msgDefault: `Setting a new password for ${email}`,
      msgErrorInputPassword: 'Password must be between 6 and 32 characters',
      msgErrorUndefined: 'Unknown error',
      submit: 'Set new password'
    }
  }

  const texts = lang === 'ru' ? textsLang.ru : textsLang.en

  const [message, setMessage] = useState<{ text: string; type?: 'error' }>({ text: texts.msgDefault })
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChangePassword: onChange = event => {
    event.preventDefault()
    setPassword(event.currentTarget.value)
    setMessage({ text: texts.msgDefault })
  }

  const handleSubmit = async () => {
    const passwordIsValid = password.length >= 6 && password.length <= 32

    if (!passwordIsValid) {
      setMessage({ text: texts.msgErrorInputPassword, type: 'error' })
    } else {
      setIsLoading(true)

      const { result } = await apiRequestClient(`/api/session/changePassword`, { userId, password, token })

      if (result) {
        await router.push('/[lang]', `/${lang}`)
        await STORE_SET_ALERT_POPUP({ inner: 'Новый пароль установлен' })
      } else {
        setMessage({ text: texts.msgErrorUndefined, type: 'error' })
      }

      setIsLoading(false)
    }
  }

  return (
    <section>
      {isLoading && (
        <div className='form'>
          <AuthorizationFormLoader />
        </div>
      )}

      {!isLoading && (
        <div className='row'>
          <div className={`message ${message.type}`}>{message.text}</div>
        </div>
      )}

      {!isLoading && (
        <div className='form'>
          <input onChange={handleChangePassword} value={password} type='text' placeholder='••••••' maxLength={32} />

          <div className='submit' onClick={handleSubmit} role='link' tabIndex={0}>
            {texts.submit}
          </div>
        </div>
      )}

      <style jsx>{
        /* language=CSS */ `
          section {
            display: flex;
            flex-direction: column;
            border-radius: 12px;
            box-shadow: 0 10px 30px 0 hsl(223, 74%, 14%);
            background: linear-gradient(60deg, hsla(140, 55%, 50%, 0.7), hsla(220, 55%, 50%, 0.7));
          }

          .form {
            flex: 1 0 100%;

            display: flex;
            flex-direction: column;

            align-items: center;
            justify-content: center;
            margin: 0 0 10px 0;

            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;

            transition: var(--app-transition);

            color: white;
          }

          .message {
            margin: 20px 30px 20px 30px;
            text-align: center;
            width: 100%;
            color: white;
          }

          .message.error {
            color: yellow;
          }

          input {
            width: 90%;
            max-width: 300px;
            margin: 10px 0;
            border: none;
            background: hsla(0, 0%, 100%, 0.2);
            box-shadow: inset 0 0 7px -4px hsl(200, 100%, 25%);
            font-size: 20px;
            font-weight: bold;
            border-radius: 4px;
          }

          .submit {
            background: hsla(0, 0%, 0%, 0.15);
            box-shadow: 0 0 7px -4px hsl(200, 100%, 25%);
            border-radius: 8px;
            padding: 8px 32px;
            margin: 10px 0;
            cursor: pointer;
          }
        `
      }</style>
    </section>
  )
}
