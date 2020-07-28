import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  lang: lang
  limit: limit
  url: Product['url']
  productId: Product['productId']
  unpublished: Product['published']
}

interface ResponseBody {
  product?: Product
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { lang, url }: RequestBody = req.body

  const result =
    lang === 'ru'
      ? await pgQuery<Product>(SQL/* language=SQL */ `
    SELECT "productId", "url", "imageUrl", "jcontainer", "titleRu", "contentRu"
    FROM "products"
    WHERE "url" = ${url} AND "published" = ${true}
  `)
      : await pgQuery<Product>(SQL/* language=SQL */ `
    SELECT "productId", "url", "imageUrl", "jcontainer", "titleEn", "contentEn"
    FROM "products"
    WHERE "url" = ${url} AND "published" = ${true}
  `)

  if (result.rowCount) {
    await res.status(200).json({ product: result?.rows?.[0] })
  } else {
    logger.error(`/api/products/selects: result.rowCount=${result.rowCount}`)
    await res.status(200).json({})
  }
}

export default withSession(Api)
