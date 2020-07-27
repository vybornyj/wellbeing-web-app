import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  rowCount?: number
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { purchaseId, published }: Purchase = req.body

  const result = await pgQuery(SQL/* language=SQL */ `
    UPDATE "userPurchases"
    SET    "published" = ${published}
    WHERE  "purchaseId" = ${purchaseId}
  `)

  if (result.err) {
    await res.status(200).json({})
  } else {
    await res.status(200).json({ rowCount: result.rowCount })
  }
}

export default withSession(Api)
