interface Page {
  pageId?: number
  url?: string

  titleRu?: string
  titleEn?: string

  contentRu?: string
  contentEn?: string

  contentRuLength?: number
  contentEnLength?: number

  added?: string
  updated?: string
}

type Pages = Page[]
