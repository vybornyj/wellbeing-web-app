import { withIronSession } from 'next-iron-session'

export const withSession = handler =>
  withIronSession(handler, {
    password: [{ id: 1, password: '&zy6Dns4gQ@#uojr#^!y&6gCjT#3r$T2' }],
    cookieName: 'session'
  })
