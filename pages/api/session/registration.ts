import bcrypt from 'bcryptjs'
import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { sendMailRegistration } from 'src/scripts-server/mails/sendMailRegistration'
import { withSession } from 'src/scripts-server/sessions/withSession'
import { generateToken } from 'src/scripts/helpers/generateToken'

interface RequestBody {
  lang: lang
  email: string
  password: string
}

interface ResponseBody {
  result?: 'msgDbError' | 'msgRegMailSendError' | 'msgRegUserExists' | 'regOk'
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { lang, email, password }: RequestBody = req.body

  const result = await pgQuery(SQL/* language=SQL */ `
    SELECT "password"
    FROM "users"
    WHERE "email" = ${email}
    LIMIT 1
  `)

  if (result.err) {
    await res.status(200).json({ result: 'msgDbError' })
  } else if (result.rowCount === 1) {
    await res.status(200).json({ result: 'msgRegUserExists' })
  } else {
    const token = generateToken()

    const errorCallback = () => {
      res.status(200).json({ result: 'msgRegMailSendError' })
    }

    const successCallback = async () => {
      const hashedPassword = bcrypt.hashSync(password, 12)

      const result = await pgQuery(SQL/* language=SQL */ `
      INSERT INTO "tokens"
             ("email", "password", "token", "type")
      VALUES (${email}, ${hashedPassword}, ${token}, ${'registration'})
    `)

      if (result.err) {
        await res.status(200).json({ result: 'msgDbError' })
      } else {
        await res.status(200).json({ result: 'regOk' })
      }
    }

    await sendMailRegistration({ lang, to: email, token, errorCallback, successCallback })
  }
}

export default withSession(Api)
