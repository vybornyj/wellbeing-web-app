import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  insertId?: number
  rowCount?: number
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { articleId, published, url, titleRu, titleEn, contentRu, contentEn, contentRuLength, contentEnLength, categories }: Article = req.body

  const result = await pgQuery(
    articleId === 0
      ? SQL/* language=SQL */ `
    INSERT
    INTO   "articles"
           ("published", "url", "titleRu", "titleEn", "contentRu", "contentEn", "contentRuLength", "contentEnLength", "categories")
    VALUES (${published}, ${url}, ${titleRu}, ${titleEn}, ${contentRu}, ${contentEn}, ${contentRuLength}, ${contentEnLength}, ${categories})
    RETURNING "articleId"`
      : SQL/* language=SQL */ `
    UPDATE "articles"
    SET
           "published" = ${published},
           "url" = ${url},
           "titleRu" = ${titleRu},
           "titleEn" = ${titleEn},
           "contentRu" = ${contentRu},
           "contentEn" = ${contentEn},
           "contentRuLength" = ${contentRuLength},
           "contentEnLength" = ${contentEnLength},
           "categories" = ${categories}
    WHERE  "articleId" = ${articleId}`
  )

  if (result.err) {
    await res.status(200).json({})
  } else {
    await res.status(200).json(articleId === 0 ? { insertId: result?.rows?.[0].articleId } : { rowCount: result.rowCount })
  }
}

export default withSession(Api)
