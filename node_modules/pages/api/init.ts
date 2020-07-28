import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  articles?: Articles
  products?: Products

  categories?: Categories
}

const Api: NextApiHandler<ResponseBody> = async (_, res) => {
  const { rows: articles, err: articlesErr } = await pgQuery(SQL/* language=SQL */ `
    SELECT "articleId", "url", "categories", "titleRu", "titleEn"
    FROM "articles"
    WHERE "published" = ${true}
    ORDER BY "articleId" DESC
    LIMIT 10
  `)

  const { rows: products, err: productsErr } = await pgQuery(SQL/* language=SQL */ `
    SELECT "productId", "url", "imageUrl", "titleRu", "titleEn"
    FROM "products"
    WHERE "published" = ${true}
    ORDER BY "productId" DESC
    LIMIT 10
  `)

  if (!articlesErr && !productsErr) {
    res.status(200).json({
      articles,
      products
    })
  } else {
    res.status(200).json({})
    logger.info('/api/init: db no data')
  }
}

export default withSession(Api)
