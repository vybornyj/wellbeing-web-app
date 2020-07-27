interface Report {
  reportId?: number
  purchaseId?: number
  published?: boolean
  title?: string
  content?: string
  contentLength?: number
}

type Reports = Report[]
