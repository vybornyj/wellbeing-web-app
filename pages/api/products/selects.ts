import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  products?: Products
}

const Api: NextApiHandler<ResponseBody> = async (_, res) => {
  const result = await pgQuery<Product>(SQL/* language=SQL */ `
    SELECT "productId", "url", "imageUrl", "jcontainer", "titleRu", "titleEn"
    FROM "products"
    WHERE "published" = ${true}
    ORDER BY "productId" DESC
  `)

  if (result.rowCount) {
    await res.status(200).json({ products: result.rows })
  } else {
    logger.error(`/api/products/selects: result.rowCount=${result.rowCount}`)
    await res.status(200).json({})
  }
}

export default withSession(Api)
