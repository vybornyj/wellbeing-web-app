import getConfig from 'next/config'
import { mailHtmlBase } from 'src/scripts-server/mails/mailHtmlBase'
import { sendMail } from 'src/scripts-server/mails/sendMail'

const { serverRuntimeConfig, publicRuntimeConfig }: GetConfig = getConfig()
const { user } = serverRuntimeConfig.NODEMAILER_CONFIG.auth

export const sendMailResetPassword = async ({ lang, to, token, errorCallback, successCallback }) => {
  const tokenUrl = `${publicRuntimeConfig.URL_APP}/${lang}/token/${token}`

  const from = lang === 'ru' ? `Исследовательский проект Благополучие <${user}>` : `Wellbeing Research Project <${user}>`
  const subject = lang === 'ru' ? 'Восстановление пароля' : 'Password recovery'

  const text =
    lang === 'ru'
      ? `
Здравствуйте!

Вы получили это письмо в ответ на запрос о сбросе пароля на сайте Исследовательского проекта Благополучие.

Чтобы сменить пароль, перейдите по ссылке:

${tokenUrl}

Если запрос о сбросе пароля поступил не от вас — ничего страшного!

Просто проигнорируйте это письмо — с вашим аккаунтом все будет в порядке.
`
      : `
Hello!

You have received this letter in response to a request for a password reset on the website of the Wellbeing Research Project.

To change the password, follow the link:

${tokenUrl}

If the request to reset the password did not come from you, it's okay!

Just ignore this email - everything will be alright with your account.
`

  const htmlInner =
    lang === 'ru'
      ? `
<p style='font-size: 22px;'>Здравствуйте!</p>
<p style='font-size: 18px;'>Вы получили это письмо в ответ на запрос о сбросе пароля на сайте Исследовательского проекта Благополучие.</p>
<p style='font-size: 22px;'>Чтобы сменить пароль, перейдите по ссылке:</p>
<p style='font-size: 18px;'><a href='${tokenUrl}'>${tokenUrl}<a/></p>
<p style='font-size: 18px;'>&nbsp;</p>
<p style='font-size: 18px;'>Если запрос о сбросе пароля поступил не от вас — ничего страшного!</p>
<p style='font-size: 18px;'>Просто проигнорируйте это письмо — с вашим аккаунтом все будет в порядке.</p>
`
      : `
<p style='font-size: 22px;'>Hello!</p>
<p style='font-size: 18px;'>You have received this letter in response to a request for a password reset on the website of the Wellbeing Research Project.</p>
<p style='font-size: 22px;'>To change the password, follow the link:</p>
<p style='font-size: 18px;'><a href='${tokenUrl}'>${tokenUrl}<a/></p>
<p style='font-size: 18px;'>&nbsp;</p>
<p style='font-size: 18px;'>If the request to reset the password did not come from you, it's okay!</p>
<p style='font-size: 18px;'>Just ignore this email - everything will be alright with your account.</p>
`

  const html = mailHtmlBase(htmlInner, lang)

  await sendMail({ from, to, subject, text, html }, errorCallback, successCallback)
}
