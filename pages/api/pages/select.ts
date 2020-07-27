import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  lang: lang
  limit: limit
  url: Page['url']
  pageId: Page['pageId']
}

interface ResponseBody {
  page?: Page
  pages?: Pages
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { lang, limit, url, pageId }: RequestBody = req.body

  // SELECT
  const query = lang
    ? lang === 'ru'
      ? SQL/* language=SQL */ `SELECT "pageId", "url", "titleRu", "contentRu", "contentRuLength"`
      : SQL/* language=SQL */ `SELECT "pageId", "url", titleEn, "contentEn", "contentEnLength"`
    : SQL/* language=SQL */ `SELECT "pageId", "url", "titleRu", "contentRu", "titleEn", "contentEn", "contentRuLength", "contentEnLength"`

  // FROM
  query.append(SQL/* language=SQL */ ` FROM pages`)

  // WHERE
  if (url) query.append(SQL/* language=SQL */ ` WHERE "url" = ${url}`)
  if (pageId) query.append(SQL/* language=SQL */ ` WHERE "pageId" = ${pageId}`)

  // ORDER BY
  query.append(SQL/* language=SQL */ ` ORDER BY "pageId" DESC`)

  // LIMIT
  query.append(SQL/* language=SQL */ ` LIMIT ${limit ?? 50}`)

  // RESULT
  const result = await pgQuery(query)
  const pages = result.rows

  if (result.rowCount) {
    await res.status(200).json(limit === 1 ? { page: pages?.[0] } : { pages })
  } else {
    await res.status(200).json({})
  }
}

export default withSession(Api)
