import { FunctionComponent, useEffect } from 'react'
import { useDispatch, useGlobal } from 'reactn'
import { HorizontalBlocksInner } from 'src/components/main/horizontalBlocks/HorizontalBlocksInner'

interface Props {
  lang?: lang
  isArticles?: true
  isProducts?: true
}

export const HorizontalBlocks: FunctionComponent<Props> = ({ lang, isArticles, isProducts }) => {
  const STORE_INIT = useDispatch('STORE_INIT')

  useEffect(() => {
    STORE_INIT()
  }, [])

  const [storeArticles10] = useGlobal('storeArticles10')
  const [storeProducts10] = useGlobal('storeProducts10')

  const articles10 = [
    ...storeArticles10.map(({ titleRu, titleEn, url }) => ({
      title: lang === 'ru' ? titleRu : titleEn,
      href: '/[lang]/articles/[url]',
      as: `/${lang}/articles/${url}`,
      imageUrl: 'https://static.wellbeing-research.ru/categories/news2.jpg',
    })),
    {
      title: lang === 'ru' ? 'Все статьи' : 'All articles',
      href: '/[lang]/articles',
      as: `/${lang}/articles`,
      imageUrl: '/images/product-default.png',
    },
  ]

  const products10 = [
    ...storeProducts10.map(({ titleRu, titleEn, url, imageUrl }) => ({
      title: lang === 'ru' ? titleRu : titleEn,
      href: '/[lang]/products/[url]',
      as: `/${lang}/products/${url}`,
      imageUrl: imageUrl || '/images/product-default.png',
    })),
    {
      title: lang === 'ru' ? 'Вся продукция' : 'All products',
      href: '/[lang]/products',
      as: `/${lang}/products`,
      imageUrl: '/images/product-default.png',
    },
  ]

  return (
    <>
      {isArticles && (
        <>
          <h2>Новые статьи</h2>
          <HorizontalBlocksInner elements={articles10} />
        </>
      )}

      {isProducts && (
        <>
          <h2>Избранные товары</h2>
          <HorizontalBlocksInner elements={products10} />
        </>
      )}
    </>
  )
}
