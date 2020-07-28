interface Article {
  articleId?: number

  published?: boolean
  url?: string

  titleRu?: string
  titleEn?: string

  contentRu?: string
  contentEn?: string

  contentRuLength?: number
  contentEnLength?: number

  categories?: number[]

  added?: string
  updated?: string
}

type Articles = Article[]
