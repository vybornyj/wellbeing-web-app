import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  limit?: limit
  purchaseId: Purchase['purchaseId']
}

interface ResponseBody {
  purchases?: Purchases
  reports?: Reports
  email?: User['email']
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { limit, purchaseId }: RequestBody = req.body

  // userId пользователя текущей покупки
  const result1 = await pgQuery<{ userId: User['userId'] }>(
    SQL/* language=SQL */ `SELECT "userId" FROM "userPurchases" WHERE "purchaseId" = ${purchaseId}`,
  )
  const { userId } = result1?.rows?.[0]

  // email этого пользователя
  const result2 = await pgQuery<{ email: User['email'] }>(SQL/* language=SQL */ `SELECT "email" FROM "users" WHERE "userId" = ${userId}`)

  // все его покупки
  const result3 = await pgQuery(SQL/* language=SQL */ `
    SELECT "userPurchases"."purchaseId",
           "userPurchases"."published",
           "userPurchases"."lang",
           "userPurchases"."added",
           "userPurchases"."userId",
           "userPurchases"."productPrice",
           "userPurchases"."productTitle",
           "userPurchases"."productVariantTitle",
           "userPurchases"."productId",
           "userPurchases"."productVariant",
           (SELECT COUNT("userReports"."published") FILTER (WHERE "userReports"."published" = TRUE)) AS "reportsCount",
           (SELECT COUNT("userReports"."published") FILTER (WHERE "userReports"."published" = FALSE)) AS "draftsCount"
    FROM "userPurchases"
           LEFT JOIN "userReports" ON "userReports"."purchaseId" = "userPurchases"."purchaseId"
    WHERE "userPurchases"."userId" = ${userId}
    GROUP BY "userPurchases"."purchaseId"
    ORDER BY "userPurchases"."purchaseId" DESC
    LIMIT ${limit ?? 50}
`)

  // все отчеты текущей покупки
  const result4 = await pgQuery(SQL/* language=SQL */ `
    SELECT "reportId", "purchaseId", "published", "title", "content", "contentLength"
    FROM "userReports"
    WHERE "purchaseId" = ${purchaseId}
`)

  await res.status(200).json(
    result1.err || result2.err || result3.err || result4.err
      ? {}
      : {
          email: result2?.rows?.[0].email,
          purchases: result3.rows,
          reports: result4.rows,
        },
  )
}

export default withSession(Api)
