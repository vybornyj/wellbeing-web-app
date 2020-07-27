import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface ResponseBody {
  insertId?: number
  rowCount?: number
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { pageId, url, titleRu, titleEn, contentRu, contentEn, contentRuLength, contentEnLength }: Page = req.body

  const result = await pgQuery(
    pageId === 0
      ? SQL/* language=SQL */ `
    INSERT
    INTO  "pages"
           ("url", "titleRu", "titleEn", "contentRu", "contentEn", "contentRuLength", "contentEnLength")
    VALUES (${url}, ${titleRu}, ${titleEn}, ${contentRu}, ${contentEn}, ${contentRuLength}, ${contentEnLength})
    RETURNING "pageId"`
      : SQL/* language=SQL */ `
    UPDATE "pages"
    SET    "url" = ${url},
           "titleRu" = ${titleRu},
           "titleEn" = ${titleEn},
           "contentRu" = ${contentRu},
           "contentEn" = ${contentEn},
           "contentRuLength" = ${contentRuLength},
           "contentEnLength" = ${contentEnLength}
    WHERE "pageId" = ${pageId}`
  )

  if (result.err) {
    await res.status(200).json({})
  } else {
    await res.status(200).json(pageId === 0 ? { insertId: result?.rows?.[0].pageId } : { rowCount: result.rowCount })
  }
}

export default withSession(Api)
