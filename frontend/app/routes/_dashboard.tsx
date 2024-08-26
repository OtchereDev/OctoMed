import { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node'
import { Link, NavLink, Outlet, redirect } from '@remix-run/react'
import SideImage from '~/assets/images/dashboard-sidebar.svg'
import Octavia from '~/assets/images/octavia.png'
import NotificationSheet from '~/components/shared/NotificationSheet'
import OctaviaModal from '~/components/shared/OctaviaModal'
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

export async function loader({ request }: LoaderFunctionArgs) {
  if (await preventUnAuthorizedUser(request)) {
    return redirect('/login')
  }

  return json({
    value: 'This is a test',
  })
}

export async function action({ request }: ActionFunctionArgs) {
  // const session = await getSession(request.headers.get('Cookie'))

  // session.unset('accessToken')
  // session.unset('email')
  // session.unset('id')
  const form = await request.formData()
  console.log('rvlahe:', form.get('rvlahe'))

  return json({})
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

export const meta: MetaFunction = () => [
  {
    title: 'OctoMed | Your AI Health Assistant',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant',
  },
]

export default function DashboardLayout() {
  return (
    <section className="h-screen max-h-screen w-full overflow-hidden lg:grid lg:grid-cols-[280px,auto]">
      <section className="hidden h-screen overflow-scroll lg:block">
        <aside className="relative hidden h-full w-[280px] flex-col border-r pb-[30px] lg:flex">
          <div className="relative flex items-center overflow-hidden px-6 pb-[20px] pt-[20px] text-white">
            <img src={SideImage} className="absolute left-0 top-0 w-full" />
            <Logo className="relative h-[27.22px] w-[115px] pl-[10px]" />
          </div>

          <div className="mt-[40px] flex flex-1 flex-col justify-between px-6">
            <div className="flex flex-col gap-5">
              {links.map(({ link, Icon, title }) => (
                <NavLink
                  key={title}
                  to={link}
                  className={({ isActive }) =>
                    (isActive ? 'bg-[#1282A2] font-semibold text-primary' : 'text-[#4D5061]') +
                    ' flex cursor-pointer items-center gap-3 text-nowrap rounded-full bg-opacity-20 px-[24px] py-[10px] hover:bg-[#1282A2] hover:bg-opacity-30 hover:text-primary'
                  }
                  end
                >
                  <Icon />
                  <p className="font-montserrat text-sm">{title}</p>
                </NavLink>
              ))}
            </div>

            <div className="border-t pt-[30px] font-montserrat font-medium text-[#4D5061]">
              <SignoutButton />
            </div>
          </div>
        </aside>
      </section>
      <section className="relative flex flex-col lg:h-screen lg:max-h-screen lg:min-h-screen lg:px-10">
        <nav className="fixed left-0 top-0 z-10 flex w-full items-center justify-between border-b border-[#D0D5DD] bg-white px-7 py-5 lg:relative lg:px-0">
          <LogoSM className="h-[27.22px] w-[35px] lg:hidden" />
          <p className="hidden font-montserrat text-xl font-semibold text-[#333] lg:block">
            Welcome, Oliver 😊
          </p>

          <div className="flex items-center gap-5">
            <NotificationSheet>
              <Bell className="size-6 cursor-pointer text-gray-500" />
            </NotificationSheet>
            <Link to={'/profile'}>
              <div className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-gray-600 text-gray-500">
                <User className="size-5" />
              </div>
            </Link>
          </div>
        </nav>

        <section className="flex-1 overflow-scroll pt-20 lg:pt-0">
          <Outlet />
        </section>

        <aside className="fixed bottom-0 left-0 flex w-full justify-between border-t bg-white px-[30px] py-[17px] lg:hidden">
          {links.slice(0, 3).map(({ Icon, title, link }) => (
            <NavLink
              to={link}
              key={title}
              className={({ isActive }) =>
                (isActive ? 'font-semibold text-primary' : '') +
                ' flex cursor-pointer flex-col items-center'
              }
              end
            >
              <Icon />
              <p className={`mt-[13px] font-poppins text-[10px] hover:text-primary`}>{title}</p>
            </NavLink>
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
                    <NavLink
                      to={link}
                      key={title}
                      className={({ isActive }) =>
                        (isActive ? 'bg-gray-300 text-black' : '') +
                        'mt-3 flex items-center gap-4 rounded-lg px-3 py-4 font-montserrat hover:bg-gray-100'
                      }
                    >
                      <Icon />
                      <p>{title}</p>
                    </NavLink>
                  ))}
                </DrawerDescription>
              </DrawerHeader>
            </DrawerContent>
          </Drawer>
        </aside>
      </section>

      <OctaviaModal>
        <div className="absolute bottom-5 right-10 z-10 h-[55px] w-[55px] cursor-pointer overflow-hidden rounded-full border-2 border-primary bg-white lg:h-[85px] lg:w-[85px] lg:border-4">
          <img src={Octavia} alt="octavia" className="h-full w-full" />
        </div>
      </OctaviaModal>
    </section>
  )
}
