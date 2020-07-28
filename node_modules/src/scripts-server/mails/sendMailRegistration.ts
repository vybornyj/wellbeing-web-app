import getConfig from 'next/config'
import { mailHtmlBase } from 'src/scripts-server/mails/mailHtmlBase'
import { sendMail } from 'src/scripts-server/mails/sendMail'

const { serverRuntimeConfig, publicRuntimeConfig }: GetConfig = getConfig()
const { user } = serverRuntimeConfig.NODEMAILER_CONFIG.auth

export const sendMailRegistration = async ({ lang, to, token, errorCallback, successCallback }) => {
  const tokenUrl = `${publicRuntimeConfig.URL_APP}/${lang}/token/${token}`

  const from = lang === 'ru' ? `Исследовательский проект Благополучие <${user}>` : `Wellbeing Research Project <${user}>`
  const subject = lang === 'ru' ? 'Завершение регистрации' : 'Registration Completion'

  const text =
    lang === 'ru'
      ? `
Здравствуйте!

Мы рады приветствовать вас на сайте Исследовательского проекта Благополучие

Чтобы получить доступ к своему аккаунту, перейдите по ссылке:

${tokenUrl}
`
      : `
Hello!

We are pleased to welcome you to the Wellbeing Research Project website.

To access your account, follow the link:

${tokenUrl}
`

  const htmlInner =
    lang === 'ru'
      ? `
<p style='font-size: 22px;'>Здравствуйте!</p>
<p style='font-size: 18px;'>Мы рады приветствовать вас на сайте Исследовательского проекта Благополучие.</p>
<p style='font-size: 22px;'>Чтобы получить доступ к своему аккаунту, перейдите по ссылке:</p>
<p style='font-size: 18px;'><a href='${tokenUrl}'>${tokenUrl}<a/></p>
`
      : `
<p style='font-size: 22px;'>Hello!</p>
<p style='font-size: 18px;'>We are pleased to welcome you to the Wellbeing Research Project website.</p>
<p style='font-size: 22px;'>To access your account, follow the link:</p>
<p style='font-size: 18px;'><a href='${tokenUrl}'>${tokenUrl}<a/></p>
`

  const html = mailHtmlBase(htmlInner, lang)

  await sendMail({ from, to, subject, text, html }, errorCallback, successCallback)
}
