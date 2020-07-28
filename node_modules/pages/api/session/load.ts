import { NextApiResponse } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  email?: string
  isAdmin?: boolean
}

const Api = async (req, res: NextApiResponse<ResponseBody>) => {
  const { userId } = req?.session?.get('user') ?? {}

  if (userId) {
    const resultUsers = await pgQuery<{ email: User['email']; isAdmin: User['isAdmin'] }>(SQL/* language=SQL */ `
          select "email", "isAdmin"
          from "users"
          where "userId" = ${userId}
          limit 1
        `)

    const { email, isAdmin } = resultUsers?.rows?.[0] ?? {}

    if (email) {
      if (userId !== 1) {
        logger.warn(`/api/session/load: userId=${userId}`)
      }
      res.status(200).json({ email, isAdmin })
    } else {
      logger.info('/api/session/load: no user for this session')
      res.status(200).json({})
    }
  } else {
    logger.info('/api/session/load: no cookie')
    res.status(200).json({})
  }
}

export default withSession(Api)
