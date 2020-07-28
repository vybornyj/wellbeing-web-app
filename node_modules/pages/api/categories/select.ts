import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  lang: lang
}

interface ResponseBody {
  categories?: Categories
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { lang }: RequestBody = req.body

  // SELECT
  const query = lang
    ? lang === 'ru'
      ? SQL/* language=SQL */ `SELECT "categoryId", "url", "titleRu"`
      : SQL/* language=SQL */ `SELECT "categoryId", "url", "titleEn"`
    : SQL/* language=SQL */ `SELECT "categoryId", "url", "titleRu", "titleEn"`

  // FROM
  query.append(SQL/* language=SQL */ ` FROM "articlesCategories"`)

  // RESULT
  const result = await pgQuery(query)
  const categories = result.rows

  if (result.rowCount) {
    await res.status(200).json({ categories })
  } else {
    await res.status(200).json({})
  }
}

export default withSession(Api)
