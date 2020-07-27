interface Product {
  productId?: number

  published?: boolean
  productLang?: 1 | 2 | 3
  url?: string
  imageUrl?: string

  titleRu?: string
  titleEn?: string

  contentRu?: string
  contentEn?: string
  contentUserRu?: string
  contentUserEn?: string

  contentRuLength?: number
  contentEnLength?: number
  contentUserRuLength?: number
  contentUserEnLength?: number

  jcontainer?: {
    variants?: {
      price: string
      titleRu: string
      profitRu: string
      titleEn: string
      profitEn: string
    }[]
  }

  added?: string
  updated?: string
}

type Products = Product[]
