import { ManifestLink } from '@remix-pwa/sw'
import { LinksFunction } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import { Toaster } from './components/ui/toaster'
import stylesheet from './tailwind.css?url'

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: stylesheet,
  },
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ManifestLink />
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
