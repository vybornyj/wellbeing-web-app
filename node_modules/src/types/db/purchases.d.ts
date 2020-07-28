interface Purchase {
  purchaseId?: number
  lang?: 1 | 2
  added?: string
  userId?: number
  productPrice?: number
  productTitle?: string
  productVariantTitle?: string
  productId?: number
  productVariant?: number
  published?: boolean

  userEmail?: string
  reportsCount?: number
  draftsCount?: number
}

type Purchases = Purchase[]
