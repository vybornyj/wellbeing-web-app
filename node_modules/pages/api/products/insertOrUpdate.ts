import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  insertId?: number
  rowCount?: number
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const {
    productId,
    published,
    productLang,
    url,
    imageUrl,
    titleRu,
    titleEn,
    contentRu,
    contentEn,
    contentUserRu,
    contentUserEn,
    contentRuLength,
    contentEnLength,
    contentUserRuLength,
    contentUserEnLength,
    jcontainer
  }: Product = req.body

  const result = await pgQuery(
    productId === 0
      ? SQL/* language=SQL */ `
    INSERT INTO "products"
           (
             "published", "productLang", "url", "imageUrl",
             "titleRu", "contentRu", "contentUserRu", "contentRuLength", "contentUserRuLength",
             "titleEn", "contentEn", "contentUserEn", "contentEnLength", "contentUserEnLength",
             "jcontainer"
           )
    VALUES (
             ${published}, ${productLang}, ${url}, ${imageUrl},
             ${titleRu}, ${contentRu}, ${contentUserRu}, ${contentRuLength}, ${contentUserRuLength},
             ${titleEn}, ${contentEn}, ${contentUserEn}, ${contentEnLength}, ${contentUserEnLength},
             ${jcontainer}
           )
    RETURNING "productId"`
      : SQL/* language=SQL */ `
    UPDATE "products"
    SET
      "published" = ${published},
      "productLang" = ${productLang},
      "url" = ${url},
      "imageUrl" = ${imageUrl},
      "titleRu" = ${titleRu},
      "contentRu" = ${contentRu},
      "contentUserRu" = ${contentUserRu},
      "contentRuLength" = ${contentRuLength},
      "contentUserRuLength" = ${contentUserRuLength},

      "titleEn" = ${titleEn},
      "contentEn" = ${contentEn},
      "contentUserEn" = ${contentUserEn},
      "contentEnLength" = ${contentEnLength},
      "contentUserEnLength" = ${contentUserEnLength},
      "jcontainer" = ${jcontainer}
    WHERE "productId" = ${productId}
  `
  )

  if (result.err) {
    await res.status(200).json({})
  } else {
    await res.status(200).json(productId === 0 ? { insertId: result.rows[0].productId } : { rowCount: result.rowCount })
  }
}

export default withSession(Api)
