import { createCookieSessionStorage } from '@remix-run/node'

type SessionData = {
  accessToken: string
  email: string
  id: number
  firstName: string
}

type SessionFlashData = {
  error: string
  toast: string
}

// TODO: expire user session in 24hrs

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
  },
})

export { commitSession, destroySession, getSession }
