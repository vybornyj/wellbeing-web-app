interface Category {
  categoryId?: number
  url?: string
  titleRu?: string
  titleEn?: string
  dbAction?: 'update' | 'delete'
}

type Categories = Category[]
