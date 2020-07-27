import Link from 'next/link'
import { FunctionComponent } from 'react'

interface Props {
  lang?: lang
  article?: Article
}

export const ArticlesElement: FunctionComponent<Props> = ({ lang, article }) => {
  const title = lang === 'ru' ? article?.titleRu : article?.titleEn
  const content = lang === 'ru' ? article?.contentRu : article?.contentEn

  return (
    <>
      <Link href='/[lang]/articles/[url]' as={`/${lang}/articles/${article?.url}`}>
        <a className='article'>
          <h2>{title}</h2>
          <article className='ql-editor' dangerouslySetInnerHTML={{ __html: content ?? '' }} />
          <div className='read'>•••</div>
        </a>
      </Link>

      <style jsx>{
        /* language=CSS */ `
          .article {
            display: block;
            border-radius: 0;
            margin: 0 0 30px 0;
            box-shadow: 1px 2px 4px 0 hsl(0, 0%, 75%);
            background: white;
          }

          .article:hover {
            box-shadow: 1px 2px 4px 0 hsl(210, 40%, 40%);
          }

          h2 {
            display: flex;
            margin: 0 0 10px 0;
            padding: 25px;
            background-position: center;
            background-image: url(https://static.wellbeing-research.ru/categories/news2.jpg);
            background-size: cover;
            text-shadow: 1px 2px 4px black;
            color: white;
            font-size: 26px;
          }

          .read {
            text-align: center;
            padding: 0 0 10px 0;
          }

          article {
            padding: 0 15px;
          }

          article > :global(*:nth-child(1)),
          article > :global(*:nth-child(2)) {
            display: block;
          }

          article > :global(*) {
            display: none;
            padding: 10px;
          }
        `
      }</style>
    </>
  )
}
