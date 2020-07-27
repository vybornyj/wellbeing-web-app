import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { sendMailResetPassword } from 'src/scripts-server/mails/sendMailResetPassword'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { generateToken } from 'src/scripts/helpers/generateToken'

interface RequestBody {
  lang: lang
  email: string
  password: string
}

interface ResponseBody {
  result?: 'msgDbError' | 'msgRegMailSendError' | 'msgAuthNoUser' | 'resetOk'
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { lang, email }: RequestBody = req.body

  const dbUsers = await pgQuery(SQL/* language=SQL */ `
    SELECT "userId", "email"
    FROM "users"
    WHERE "email" = ${email}
    LIMIT 1
  `)

  if (dbUsers.err) {
    await res.status(200).json({ result: 'msgDbError' })
  } else if (dbUsers.rowCount === 1) {
    const token = generateToken()

    const errorCallback = () => {
      res.status(200).json({ result: 'msgRegMailSendError' })
    }

    const successCallback = async () => {
      const { userId, email: _email } = dbUsers?.rows?.[0] ?? {}

      const result = await pgQuery(SQL/* language=SQL */ `
        INSERT INTO "tokens"
               ("userId", "email", "token", "type")
        VALUES (${userId}, ${_email}, ${token}, ${'resetPassword'})
      `)

      if (result.err) {
        await res.status(200).json({ result: 'msgDbError' })
      } else {
        await res.status(200).json({ result: 'resetOk' })
      }
    }

    await sendMailResetPassword({ lang, to: email, token, errorCallback, successCallback })
  } else {
    await res.status(200).json({ result: 'msgAuthNoUser' })
  }
}

export default withSession(Api)
