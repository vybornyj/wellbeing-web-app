import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faBoxOpen, faCog, faHome, faJedi, faStore } from '@fortawesome/free-solid-svg-icons'

export type menuItems = {
  type?: string
  langPrefix?: boolean
  children?: string
  ru?: string
  en?: string
  href?: string
  as?: string
  faIcon?: IconProp
}[]

// TODO: тайтлы должны быть на двух языках!
// TODO: В админку только для админов!

export const templateUserMenuItems: menuItems = [
  { type: 'title', children: 'Личный кабинет', en: 'My Account' },
  { type: 'button', ru: 'Мои заказы', en: 'My orders', href: '/my', faIcon: faBoxOpen },
  { type: 'button', ru: 'Настройки', en: 'Settings', href: '/my/settings', faIcon: faCog },

  { type: 'title', children: 'Ссылки', en: 'Links' },
  { type: 'button', ru: 'На главную', en: 'Main Page', href: '/', faIcon: faHome },
  { type: 'button', ru: 'В магазин', en: 'Store', href: '/products', faIcon: faStore },
  { type: 'button', ru: 'В админку', en: 'Admin Side', href: '/admin', faIcon: faJedi, langPrefix: false }
]
