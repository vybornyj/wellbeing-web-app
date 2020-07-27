import { faFile } from '@fortawesome/free-regular-svg-icons'
import { faAt, faBoxOpen, faHome, faInbox, faJedi, faParagraph, faRocket, faStore, faTags } from '@fortawesome/free-solid-svg-icons'
import { menuItems } from 'src/components/templates/template-user/templateUserMenuItems'

export const templateAdminMenuItems: menuItems = [
  { type: 'title', children: 'Администрирование' },
  { type: 'button', children: 'Админка', href: '/admin', faIcon: faJedi },

  { type: 'title', children: 'Магазин' },
  { type: 'button', children: 'Заказы', href: '/admin/purchases', faIcon: faInbox },
  { type: 'button', children: 'Магазин', href: '/admin/store', faIcon: faStore },

  { type: 'title', children: 'Статьи' },
  { type: 'button', children: 'Статьи', href: '/admin/articles', faIcon: faParagraph },
  { type: 'button', children: 'Категории', href: '/admin/categories', faIcon: faTags },
  { type: 'button', children: 'Авторы', href: '/admin/authors', faIcon: faAt },

  { type: 'title', children: 'Страницы' },
  { type: 'button', children: 'Страницы', href: '/admin/pages', faIcon: faFile },
  { type: 'button', children: 'Quick Links', href: '/admin/quick-links', faIcon: faRocket },

  { type: 'title', children: 'Ссылки' },
  { type: 'button', children: 'На главную', href: '/[lang]', as: '/ru', faIcon: faHome },
  { type: 'button', children: 'Main Page', href: '/[lang]', as: '/en', faIcon: faHome },
  { type: 'button', children: 'Личный каб', href: '/[lang]/my', as: '/ru/my', faIcon: faBoxOpen },
  { type: 'button', children: 'My Account', href: '/[lang]/my', as: '/en/my', faIcon: faBoxOpen }
]
