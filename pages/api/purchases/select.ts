import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  limit?: limit
  published?: Purchase['published']
}

interface ResponseBody {
  purchases?: Purchases
  completedCount?: number
  activeCount?: number
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { limit, published }: RequestBody = req.body

  const result1 = await pgQuery(SQL/* language=SQL */ `
    SELECT "userPurchases"."purchaseId",
           "userPurchases"."lang",
           "userPurchases"."added",
           "userPurchases"."userId",
           "userPurchases"."productPrice",
           "userPurchases"."productTitle",
           "userPurchases"."productVariantTitle",
           "userPurchases"."productId",
           "userPurchases"."productVariant",
           "users"."email" AS "userEmail",
           (SELECT COUNT("userReports"."published") FILTER (WHERE "userReports"."published" = TRUE)) AS "reportsCount",
           (SELECT COUNT("userReports"."published") FILTER (WHERE "userReports"."published" = FALSE)) AS "draftsCount"
    FROM "userPurchases"
           INNER JOIN "users" ON "users"."userId" = "userPurchases"."userId"
           LEFT JOIN "userReports" ON "userReports"."purchaseId" = "userPurchases"."purchaseId"
    WHERE "userPurchases"."published" = ${published}
    GROUP BY "userPurchases"."purchaseId", "users"."userId"
    ORDER BY "userPurchases"."purchaseId" DESC
    LIMIT ${limit ?? 50}
`)

  const result2 = await pgQuery(SQL/* language=SQL */ `SELECT COUNT(*) FROM "userPurchases" WHERE "published" = ${true}`)

  const result3 = await pgQuery(SQL/* language=SQL */ `SELECT COUNT(*) FROM "userPurchases" WHERE "published" = ${false}`)

  await res.status(200).json(
    result1.err || result2.err || result3.err
      ? {}
      : {
          purchases: result1?.rows,
          activeCount: result2?.rows?.[0].count,
          completedCount: result3?.rows?.[0].count
        }
  )
}

export default withSession(Api)
