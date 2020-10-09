import { NextApiResponse } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  token: string
}

interface ResponseBody {
  success?: true
  type?: 'registration' | 'resetPassword'
  email?: User['email']
  userId?: User['userId']
  error?: error
}

const Api = async (req, res: NextApiResponse<ResponseBody>) => {
  const { token }: RequestBody = req.body

  const resultSelectTokens = await pgQuery(SQL/* language=SQL */ `
    SELECT "tokenId", "email", "password", "type", "userId"
    FROM   "tokens"
    WHERE  "token" = ${token}
  `)

  const selectedToken = resultSelectTokens?.rows?.[0]

  if (selectedToken) {
    if (selectedToken?.type === 'registration') {
      //
      // REGISTRATION TOKEN
      //
      const resultInsertUser = await pgQuery(SQL/* language=SQL */ `
      INSERT INTO "users"
             ("email", "password")
      VALUES (${selectedToken.email}, ${selectedToken.password})
      RETURNING "userId"`)

      const { userId, isAdmin } = resultInsertUser?.rows?.[0]

      if (userId) {
        const result = await pgQuery(SQL/* language=SQL */ `
          DELETE FROM "tokens"
          WHERE "tokenId" = ${selectedToken.tokenId}
        `)

        if (!result.err) {
          req.session.set('user', { userId, isAdmin })
          await req.session.save()

          res.status(200).json({ success: true, type: selectedToken.type, email: selectedToken.email })
        } else {
          logger.error(`api/tokens/select: database error 2`)
          res.status(200).json({})
        }
      } else {
        logger.error(`api/tokens/select: database error 1`)
        res.status(200).json({})
      }
    } else if (selectedToken?.type === 'resetPassword') {
      //
      // RESET PASSWORD TOKEN
      //
      res.status(200).json({
        success: true,
        type: selectedToken.type,
        userId: selectedToken.userId,
        email: selectedToken.email,
      })
    } else {
      logger.error(`/api/tokens/select: unknown token type`)
      res.status(200).json({})
    }
  } else {
    logger.warn(`/api/tokens/select: token not found`)
    await res.status(200).json({})
  }
}

export default withSession(Api)
