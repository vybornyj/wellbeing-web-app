import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  singleton?: any
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { singletonId } = req.body

  const result = await pgQuery(SQL/* language=SQL */ `SELECT "jcontainer"
                                   FROM "singletons"
                                   WHERE "singletonId" = ${singletonId}
                                   LIMIT 1`)

  if (result.rowCount) {
    await res.status(200).json({ singleton: result?.rows?.[0].jcontainer })
  } else {
    await res.status(200).json({})
  }
}

export default withSession(Api)
