import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
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
  products?: Products
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { lang, limit = 50, url, productId, unpublished = false }: RequestBody = req.body

  // SELECT
  const query = lang
    ? lang === 'ru'
      ? SQL/* language=SQL */ `SELECT "productId", "productLang", "url", "imageUrl", "jcontainer", "titleRu", "contentRu", "contentUserRu", "contentRuLength", "contentUserRuLength"`
      : SQL/* language=SQL */ `SELECT "productId", "productLang", "url", "imageUrl", "jcontainer", "titleEn", "contentEn", "contentUserEn", "contentEnLength", "contentUserEnLength"`
    : SQL/* language=SQL */ `SELECT   "productId", "productLang", "url", "imageUrl", "jcontainer", "titleRu", "contentRu", "contentUserRu", "contentRuLength", "contentUserRuLength",
                                                                      "titleEn", "contentEn", "contentUserEn", "contentEnLength", "contentUserEnLength",
                                                                      "published", "added", "updated"`

  // FROM
  query.append(SQL/* language=SQL */ ` FROM "products"`)

  // WHERE
  if (url) {
    query.append(SQL/* language=SQL */ ` WHERE "url" = ${url} AND "published" = ${true}`)
  } else if (productId) {
    query.append(SQL/* language=SQL */ ` WHERE "productId" = ${productId}`)
  } else if (!unpublished) {
    query.append(SQL/* language=SQL */ ` WHERE "published" = ${true}`)
  }

  // ORDER BY
  query.append(SQL/* language=SQL */ ` ORDER BY "productId" DESC`)

  // LIMIT
  query.append(SQL/* language=SQL */ ` LIMIT ${limit}`)

  // RESULT
  const result = await pgQuery(query)
  const products = result.rows

  if (result.rowCount) {
    await res.status(200).json(limit === 1 ? { product: products[0] } : { products })
  } else {
    await res.status(200).json({})
  }
}

export default withSession(Api)
