import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  report?: Report
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { reportId, purchaseId, published, title, content, contentLength }: Report = req.body

  const result =
    reportId === 0
      ? await pgQuery(SQL/* language=SQL */ `
        INSERT INTO "userReports"
               ("purchaseId", "published", "title", "content", "contentLength")
        VALUES (${purchaseId}, ${published}, ${title}, ${content},${contentLength})
        RETURNING "reportId"`)
      : await pgQuery(SQL/* language=SQL */ `
        UPDATE "userReports"
        SET    "purchaseId" = ${purchaseId},
               "published" = ${published},
               "title" = ${title},
               "content" = ${content},
               "contentLength" = ${contentLength}
        WHERE  "reportId" = ${reportId}
      `)

  if (!result.err && reportId === 0) {
    // todo: отправить email
  }

  const result2 = await pgQuery(SQL/* language=SQL */ `
    SELECT "reportId", "purchaseId", "published", "title", "content", "contentLength"
    FROM "userReports"
    WHERE "reportId" = ${reportId === 0 ? result?.rows?.[0].reportId : reportId}
  `)

  if (result.err || result2.err) {
    await res.status(200).json({})
  } else {
    await res.status(200).json({ report: result2?.rows?.[0] })
  }
}

export default withSession(Api)
