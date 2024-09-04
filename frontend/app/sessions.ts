import { createCookieSessionStorage } from '@remix-run/node'

type SessionData = {
  accessToken: string
  email: string
  id: number
  firstName: string
  streak: string
}

type SessionFlashData = {
  error: string
  toast: string
}

const { getSession, commitSession, destroySession } = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: '__session_octomed',
    domain: 'localhost',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: ['s3cret1'],
    secure: true,
    maxAge: 24 * 60 * 60,
  },
})

export { commitSession, destroySession, getSession }
