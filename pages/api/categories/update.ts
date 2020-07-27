import { NextApiHandler } from 'next'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { withSession } from 'src/scripts-server/sessions/withSession'

interface RequestBody {
  categories?: Categories
}

interface ResponseBody {
  categories?: Categories
  logs: any[]
}

const Api: NextApiHandler<ResponseBody> = async (req, res) => {
  const { categories }: RequestBody = req.body

  let logs = []
  logs = [...logs, categories]

  categories.forEach(async category => {
    if (category.dbAction === 'update') {
      if (category.categoryId) {
        logs = [
          ...logs,
          await pgQuery(SQL/* language=SQL */ `
        UPDATE "articlesCategories"
        SET    "url" = ${category.url},
               "titleRu" = ${category.titleRu},
               "titleEn" = ${category.titleEn}
        WHERE  "categoryId" = ${category.categoryId}
      `)
        ]
      } else {
        logs = [
          ...logs,
          await pgQuery(SQL/* language=SQL */ `
        INSERT
        INTO   "articlesCategories"
               ("url", "titleRu", "titleEn")
        VALUES (${category.url}, ${category.titleRu}, ${category.titleEn})
      `)
        ]
      }
    } else if (category?.dbAction === 'delete') {
      logs = [
        ...logs,
        await pgQuery(SQL/* language=SQL */ `
        DELETE
        FROM "articlesCategories"
        WHERE  "categoryId" = ${category.categoryId}
      `)
      ]

      logs = [
        ...logs,
        await pgQuery(SQL/* language=SQL */ `
        UPDATE "articles"
        SET "categories" = array_remove("categories", ${category.categoryId})
        WHERE "categories" @> ARRAY[${category.categoryId}]::integer[]
      `)
      ]
    }
  })

  const result = await pgQuery(SQL/* language=SQL */ `SELECT "categoryId", "url", "titleRu", "titleEn"
                                   FROM "articlesCategories"`)

  await res.status(200).json({ categories: result.rows, logs })
}

export default withSession(Api)
