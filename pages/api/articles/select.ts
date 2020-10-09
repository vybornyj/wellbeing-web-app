import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  lang: lang
  limit: limit
  url: Article['url']
  articleId: Article['articleId']
  categoryUrl: Category['url']
  unpublished: boolean
}

interface ResponseBody {
  article?: Article
  articles?: Articles
  categories?: Categories
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { lang, limit, url, articleId, categoryUrl, unpublished }: RequestBody = req.body

  // SELECT
  const query2 = lang
    ? lang === 'ru'
      ? SQL/* language=SQL */ `SELECT "categoryId", "url", "titleRu"`
      : SQL/* language=SQL */ `SELECT "categoryId", "url", "titleEn"`
    : SQL/* language=SQL */ `SELECT "categoryId", "url", "titleRu", "titleEn"`

  // FROM
  query2.append(SQL/* language=SQL */ ` FROM "articlesCategories"`)

  const result2 = await pgQuery(query2)
  const categories: Categories = result2.rows

  // ///////
  // SELECT
  const query3 = lang
    ? lang === 'ru'
      ? SQL/* language=SQL */ `SELECT "articleId", "url", "authorId", "categories", "titleRu", "contentRu", "contentRuLength"`
      : SQL/* language=SQL */ `SELECT "articleId", "url", "authorId", "categories", "titleEn", "contentEn", "contentEnLength"`
    : SQL/* language=SQL */ `SELECT   "articleId", "url", "authorId", "categories", "titleRu", "contentRu", "contentRuLength",
                                                         "titleEn", "contentEn", "contentEnLength",
                                                         "published", "added", "updated"`

  // FROM
  query3.append(SQL/* language=SQL */ ` FROM "articles"`)

  // WHERE
  if (url) {
    query3.append(SQL/* language=SQL */ ` WHERE "url" = ${url} AND "published" = ${true}`)
  } else if (categoryUrl) {
    const category = categories.find(({ url }) => url === categoryUrl)
    query3.append(SQL/* language=SQL */ ` WHERE categories @> ARRAY[${category?.categoryId}]::integer[] AND "published" = ${true}`)
  } else if (articleId) {
    query3.append(SQL/* language=SQL */ ` WHERE "articleId" = ${articleId}`)
  } else if (!unpublished) {
    query3.append(SQL/* language=SQL */ ` WHERE "published" = ${true}`)
  }

  // ORDER BY
  query3.append(SQL/* language=SQL */ ` ORDER BY "articleId" DESC`)

  // LIMIT
  query3.append(SQL/* language=SQL */ ` LIMIT ${limit ?? 50}`)

  const result3 = await pgQuery(query3)
  const articles = result3.rows

  if (result3.rowCount) {
    res.status(200).json(
      limit === 1
        ? { article: articles?.[0], categories }
        : {
            articles,
            categories,
          },
    )
  } else {
    res.status(200).json({})
  }
}

export default withSession(Api)
