import { ActionFunctionArgs, LoaderFunctionArgs, json } from '@remix-run/node'
import { Link, Outlet, redirect } from '@remix-run/react'
import { useState } from 'react'
import SideImage from '~/assets/images/dashboard-sidebar.svg'
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
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from '~/components/ui/drawer'
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
        <aside className="relative hidden h-full w-[280px] flex-col border-r pb-[30px] lg:flex">
          <div className="relative flex items-center overflow-hidden px-6 pb-[20px] pt-[20px] text-white">
            <img src={SideImage} className="absolute left-0 top-0 w-full" />
            <Logo className="relative h-[27.22px] w-[115px] pl-[10px]" />
          </div>

          <div className="mt-[40px] flex flex-1 flex-col justify-between px-6">
            <div className="flex flex-col gap-5">
              {links.map(({ link, Icon, title }) => (
                <div
                  key={title}
                  className={`flex cursor-pointer items-center gap-3 rounded-full bg-opacity-20 px-[24px] py-[10px] ${selected == title ? 'bg-[#1282A2] font-semibold text-primary' : 'text-[#4D5061]'}`}
                >
                  <Icon />
                  <p className="font-montserrat text-sm">{title}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-[30px] font-montserrat font-medium text-[#4D5061]">
              <SignoutButton />
            </div>
          </div>
        </aside>
      </section>
      <section className="relative flex flex-col lg:h-screen lg:min-h-screen lg:px-10">
        <nav className="fixed left-0 top-0 z-10 flex w-full items-center justify-between border-b border-[#D0D5DD] bg-white px-7 py-5 lg:relative lg:px-0">
          <LogoSM className="h-[27.22px] w-[35px] lg:hidden" />
          <p className="hidden font-montserrat text-xl font-semibold text-[#333] lg:block">
            Welcome, Oliver 😊
          </p>

          <div className="flex items-center gap-5">
            <Bell className="size-6 cursor-pointer text-gray-500" />
            <Link to={'/profile'}>
              <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-gray-600 text-gray-500">
                <User className="size-5" />
              </div>
            </Link>
          </div>
        </nav>

        <section className="flex-1 overflow-scroll pb-32 pt-20 lg:pt-0">
          <Outlet />
        </section>

        <aside className="fixed bottom-0 left-0 flex w-full justify-between border-t bg-white px-[30px] py-[17px] lg:hidden">
          {links.slice(0, 3).map(({ Icon, title, link }) => (
            <div key={title} className="flex cursor-pointer flex-col items-center">
              <Icon />
              <p
                className={`mt-[13px] font-poppins text-[10px] ${selected == title ? 'font-semibold text-primary' : ''} `}
              >
                {title}
              </p>
            </div>
          ))}
          <Drawer>
            <DrawerTrigger>
              <div className="flex cursor-pointer flex-col items-center">
                <More />
                <p className={`mt-[13px] font-poppins text-[10px]`}>More</p>
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerDescription className="flex flex-col divide-y">
                  {links.slice(3).map(({ Icon, title, link }) => (
                    <Link to={link} className="pb-4">
                      <div className="mt-3 flex items-center gap-4 rounded-lg px-3 py-4 font-montserrat hover:bg-gray-100">
                        <Icon />
                        <p>{title}</p>
                      </div>
                    </Link>
                  ))}
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </aside>
      </section>
    </section>
  )
}
