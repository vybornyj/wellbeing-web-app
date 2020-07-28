interface User {
  userId?: number
  role?: number
  email?: string
  password?: string
  added?: string
  updated?: string
  isAdmin?: boolean
}

type Users = User[]
