import { NextApiHandler } from 'next'
import { SitemapStream, streamToPromise } from 'sitemap'
import SQL from 'sql-template-strings'
import { pgQuery } from 'src/scripts-server/db/pgQuery'
import { logger } from 'src/scripts-server/logger/logger'
import { withSession } from 'src/scripts-server/sessions/withSession'

type Writes = (array: { url?: string }[], prefix?: string) => void

const Api: NextApiHandler = async (req, res) => {
  try {
    const smStream = new SitemapStream({ hostname: `https://${req.headers.host}` })

    const writes: Writes = (array, prefix = '/') =>
      array.forEach(el => {
        const ru = `/ru${prefix}${el.url}`
        const en = `/en${prefix}${el.url}`
        smStream.write({
          url: ru,
          links: [
            { lang: 'ru', url: ru },
            { lang: 'en', url: en }
          ]
        })
        smStream.write({
          url: en,
          links: [
            { lang: 'en', url: en },
            { lang: 'ru', url: ru }
          ]
        })
      })

    const result1 = await pgQuery(SQL/* language=SQL */ `SELECT "url"
                                      FROM "products"
                                      WHERE "published" = ${true}`)
    const products = result1.rows

    const result2 = await pgQuery(SQL/* language=SQL */ `SELECT "url"
                                      FROM "articles"
                                      WHERE "published" = ${true}`)
    const articles = result2.rows

    const result3 = await pgQuery(SQL/* language=SQL */ `SELECT "url"
                                      FROM "articlesCategories"`)
    const articlesCategories = result3.rows

    const result4 = await pgQuery(SQL/* language=SQL */ `SELECT "url"
                                      FROM "pages"`)
    const pages = result4.rows

    writes([{ url: '' }], '')
    writes([{ url: 'articles' }, { url: 'my' }, { url: 'products' }, { url: 'cart' }])
    writes(products, '/products/')
    writes(articles, '/articles/')
    writes(articlesCategories, '/cat/')
    writes(pages)

    smStream.end()
    const sitemapOutput = (await streamToPromise(smStream)).toString()

    res.setHeader('content-type', 'application/xml')
    res.status(200).send(sitemapOutput)
  } catch (e) {
    logger.error(`api/sitemap: exception`)
    await res.status(404).json(e)
  }
}

export default withSession(Api)
