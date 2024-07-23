import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { Outlet, redirect } from '@remix-run/react'
import { useState } from 'react'
import SignoutButton from '~/components/shared/Signout'
import {
  Bell,
  Community,
  Dashboard,
  Diet,
  HealthData,
  HealthProvider,
  Library,
  Logo,
  LogoSM,
  More,
  User,
} from '~/components/shared/icons'
import { preventUnAuthorizedUser } from '~/lib/preventUnAuthorizedUser'
import { commitSession, getSession } from '~/sessions'

export async function loader({ request }: LoaderFunctionArgs) {
  if (await preventUnAuthorizedUser(request)) {
    return redirect('/login')
  }

  return json({})
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))

  console.log('I was called')

  session.unset('accessToken')
  session.unset('email')

  return redirect('/', {
    headers: {
      'Set-Cookie': await commitSession(session),
    },
  })
}

const links = [
  {
    Icon: Dashboard,
    title: 'Dashboard',
    link: '/',
  },
  {
    Icon: HealthData,
    title: 'Health Data',
    link: '/health-data',
  },
  {
    Icon: HealthProvider,
    title: 'Health Care Providers',
    link: '/health-care-providers',
  },
  {
    Icon: More,
    title: 'More',
    link: '#',
  },
]

const DesktopLinks = [
  ...links.slice(0, 3),
  {
    Icon: Diet,
    title: 'Diet and Exercises',
    link: '/diet-and-exercises',
  },
  {
    Icon: Library,
    title: 'Library',
    link: '/library',
  },
  {
    Icon: Community,
    title: 'Community',
    link: '/community',
  },
]

export default function DashboardLayout() {
  const [selected, setSelected] = useState('Dashboard')
  return (
    <section className="max-h-screen w-full lg:grid lg:grid-cols-[280px,auto]">
      <section className="hidden h-screen overflow-scroll lg:block">
        <aside className="relative hidden h-full w-[280px] flex-col border-r px-6 py-[30px] lg:flex">
          <div className="text-primary">
            <Logo className="mb-[63px] h-[27.22px] w-[115px] pl-[6px]" />
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div className="flex flex-col gap-5">
              {DesktopLinks.map(({ link, Icon, title }) => (
                <div
                  className={`flex cursor-pointer items-center gap-3 rounded-full bg-opacity-20 px-[24px] py-[10px] ${selected == title ? 'bg-[#1282A2] font-semibold text-primary' : 'text-[#4D5061]'}`}
                >
                  <Icon />
                  <p className="font-montserrat text-sm">{title}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-[30px] font-montserrat font-medium text-[#4D5061]">
              {/* <Form method="POST">
                <button type="submit" className="flex items-center gap-3">
                  <Signout />
                  <p>Sign Out</p>
                </button>
              </Form> */}
              <SignoutButton />
            </div>
          </div>
        </aside>
      </section>
      <section className="relative flex flex-col lg:h-screen lg:min-h-screen lg:px-10">
        <nav className="fixed left-0 top-0 flex w-full items-center justify-between border-b border-[#D0D5DD] bg-white px-7 py-5 lg:relative lg:px-0">
          <LogoSM className="h-[27.22px] w-[35px] lg:hidden" />
          <p className="hidden font-montserrat text-xl font-semibold text-[#333] lg:block">
            Welcome, Oliver 😊
          </p>

          <div className="flex items-center gap-5">
            <Bell className="size-6 cursor-pointer text-gray-500" />
            <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-gray-600 text-gray-500">
              <User className="size-5" />
            </div>
          </div>
        </nav>

        <section className="flex-1 overflow-scroll pt-20 lg:pt-0">
          <Outlet />
        </section>

        <aside className="fixed bottom-0 left-0 flex w-full justify-between border-t bg-white px-[30px] py-[17px] lg:hidden">
          {links.map(({ Icon, title, link }) => (
            <div key={title} className="flex cursor-pointer flex-col items-center">
              <Icon />
              <p
                className={`mt-[13px] font-poppins text-[10px] ${selected == title ? 'font-semibold text-primary' : ''} `}
              >
                {title}
              </p>
            </div>
          ))}
        </aside>
      </section>
    </section>
  )
}
