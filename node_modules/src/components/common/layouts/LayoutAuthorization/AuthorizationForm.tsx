import { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch } from 'reactn'
import { AuthorizationFormLoader } from 'src/components/common/layouts/LayoutAuthorization/AuthorizationFormLoader'
import { textsLang } from 'src/components/common/layouts/LayoutAuthorization/textsLang'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import { validateEmail } from 'src/scripts/helpers/validateEmail'

interface Props {
  lang: lang
}

export const AuthorizationForm: FunctionComponent<Props> = ({ lang }) => {
  const STORE_SET_USER = useDispatch('STORE_SET_USER')

  const texts = lang === 'ru' ? textsLang.ru : textsLang.en

  const [formType, setFormType] = useState<'authorization' | 'reset'>('authorization')
  const [message, setMessage] = useState<{ text: string; type: 'error' | '' }>({ text: texts[formType].msgDefault, type: '' })
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isOnlyMessage, seIsOnlyMessage] = useState(false)

  const resetMessage = () => setMessage({ text: texts[formType].msgDefault, type: '' })
  useEffect(() => resetMessage(), [lang, formType])

  // ON CHANGES
  const handleChangeEmail: onChange = event => {
    event.preventDefault()
    setEmail(event.currentTarget.value.toLowerCase())
  }

  const handleChangePassword: onChange = event => {
    event.preventDefault()
    setPassword(event.currentTarget.value)
  }

  // ON CLICK
  const handleSubmit = async () => {
    const emailIsValid = validateEmail(email)
    const passwordIsValid = password.length >= 6 && password.length <= 32

    if (!emailIsValid) {
      setMessage({ text: texts.msgErrorInputEmail, type: 'error' })
    } else if (!passwordIsValid && formType !== 'reset') {
      setMessage({ text: texts.msgErrorInputPassword, type: 'error' })
    } else {
      setIsLoading(true)
      resetMessage()

      const { result, user } = await apiRequestClient(`/api/session/${formType}`, { lang, email, password })

      if (result === 'regOk') {
        seIsOnlyMessage(true)
        setMessage({ text: texts.regOk, type: 'error' })
      } else if (result === 'authOk') {
        setMessage({ text: '', type: '' })
        await STORE_SET_USER(user)
      } else if (result === 'resetOk') {
        seIsOnlyMessage(true)
        setMessage({ text: texts.resetOk, type: '' })
      } else {
        const text = texts?.[result] ?? texts.msgError
        setMessage({ text, type: 'error' })
      }

      setIsLoading(false)
    }
  }

  return (
    <section className={formType}>
      {!isOnlyMessage && !isLoading && (
        <div className='row'>
          <div className='button buttonAuth' onClick={() => setFormType('authorization')} role='link' tabIndex={0}>
            <div>{texts.authButton}</div>
          </div>
          <div className='button buttonReg' onClick={() => setFormType('reset')} role='link' tabIndex={0}>
            <div>{texts.forgotPassword}</div>
          </div>
        </div>
      )}

      {!isLoading && (
        <div className='row'>
          <div className={`message ${message.type}`}>{message.text}</div>
        </div>
      )}

      {isLoading && (
        <div className='form'>
          <AuthorizationFormLoader />
        </div>
      )}

      {!isOnlyMessage && !isLoading && (
        <div className='form'>
          <input onChange={handleChangeEmail} value={email} type='text' placeholder='your-email@example.com' maxLength={255} />

          {formType === 'authorization' && (
            <input onChange={handleChangePassword} value={password} type='password' placeholder='••••••' maxLength={32} />
          )}

          <div className='submit' onClick={handleSubmit} role='link' tabIndex={0}>
            {texts[formType].submit}
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

          .button {
            flex: 1 0 50%;

            display: flex;

            align-items: center;
            justify-content: center;
            padding: 15px 0;
            font-weight: bold;
            color: white;
            transition: var(--app-transition);
            background: hsla(0, 0%, 0%, 0.1);
          }

          .button > div {
            margin-bottom: 4px;
            border-bottom: 2px solid transparent;
          }

          .buttonAuth {
            border-top-left-radius: 12px;
          }

          .buttonReg {
            border-top-right-radius: 12px;
          }

          .reset .buttonAuth,
          .authorization .buttonReg {
            cursor: pointer;
          }

          .reset .buttonAuth {
            box-shadow: inset -1px 1px 7px -4px hsl(200, 100%, 10%);
          }

          .authorization .buttonAuth {
            background: transparent;
          }

          .authorization .buttonAuth > div {
            border-bottom: 2px solid white;
          }

          .authorization .buttonReg {
            box-shadow: inset 1px 1px 7px -4px hsl(200, 100%, 10%);
          }

          .reset .buttonReg {
            background: transparent;
          }

          .reset .buttonReg > div {
            border-bottom: 2px solid white;
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
