import bcrypt from 'bcryptjs'
import { NextApiResponse } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  userId: User['userId']
  password: User['password']
  token: string
}

interface ResponseBody {
  result?: true
}

const Api = async (req, res: NextApiResponse<ResponseBody>) => {
  const { token, userId, password }: RequestBody = req.body

  const resultSelectTokens = await pgQuery(SQL/* language=SQL */ `
    SELECT "type", "userId"
    FROM   "tokens"
    WHERE  "token" = ${token}
  `)

  if (!resultSelectTokens.err && resultSelectTokens?.rows?.[0]?.type === 'resetPassword' && resultSelectTokens?.rows?.[0]?.userId === userId) {
    const hashedPassword = bcrypt.hashSync(password, 12)

    const resultUpdateUsers = await pgQuery(SQL/* language=SQL */ `
      UPDATE "users"
      SET    "password" = ${hashedPassword}
      WHERE  "userId" = ${userId}
    `)

    if (!resultUpdateUsers.err && resultUpdateUsers.rowCount === 1) {
      const resultDeleteTokens = await pgQuery(SQL/* language=SQL */ `
        DELETE FROM "tokens"
        WHERE "token" = ${token}
      `)

      if (resultDeleteTokens.err) {
        logger.error(`/api/session/changePassword: (resultDeleteTokens.err), token=${token}`)
      }

      req.session.destroy()

      res.status(200).json({
        result: true
      })
    } else {
      logger.error(`/api/session/changePassword: (resultUpdateUsers.err, ...), token=${token}`)
      res.status(200).json({})
    }
  } else {
    logger.error(`/api/session/changePassword: (resultSelectTokens.err, ...), token=${token}`)
    res.status(200).json({})
  }
}

export default withSession(Api)
