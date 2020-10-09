import bcrypt from 'bcryptjs'
import { NextApiResponse } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  result?: 'msgDbError' | 'authOk' | 'msgAuthWrongPassword' | 'msgAuthNoUser'
  user?: {
    email: string
    isAdmin: boolean
  }
}

const Api = async (req, res: NextApiResponse<ResponseBody>) => {
  const { email, password }: User = req.body

  const result = await pgQuery(SQL/* language=SQL */ `
    SELECT "userId", "password", "isAdmin"
    FROM "users"
    WHERE "email" = ${email}
    LIMIT 1
  `)

  if (result.err) {
    res.status(200).json({ result: 'msgDbError' })
  } else if (result.rowCount === 1) {
    const { userId, isAdmin, password: hashedPassword } = result?.rows?.[0]
    const isTruePassword = bcrypt.compareSync(password, hashedPassword)

    if (isTruePassword) {
      req.session.set('user', { userId, isAdmin })
      await req.session.save()

      res.status(200).json({
        result: 'authOk',
        user: { email, isAdmin },
      })
    } else {
      res.status(200).json({ result: 'msgAuthWrongPassword' })
    }
  } else {
    res.status(200).json({ result: 'msgAuthNoUser' })
  }
}

export default withSession(Api)
