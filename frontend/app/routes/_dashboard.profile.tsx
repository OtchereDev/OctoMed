import { LoaderFunctionArgs, MetaFunction, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import Avatar from '~/components/auth/Avatar'
import BioDataForm from '~/components/profile/BioDataForm'
import HealthConditionForm from '~/components/profile/HealthConditionForm'
import LocationForm from '~/components/profile/LocationForm'
import ProfileDetailForm from '~/components/profile/ProfileDetailForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { getHealthConditions } from '~/server/health-condition.server'

export async function loader({ request }: LoaderFunctionArgs) {
  const response = await getHealthConditions()

  return json({
    ...response,
  })
}

export const meta: MetaFunction = () => [
  {
    title: 'OctoMed | Your AI Health Assistant | Profile',
  },
  {
    name: 'description',
    content: 'Your AI Health Assistant | Profile',
  },
]

export default function Profile() {
  const loaderData = useLoaderData<typeof loader>()

  return (
    <section className="mt-10">
      <section className="px-8">
        <h1 className="mb-7 font-montserrat text-lg font-semibold text-[#333] lg:hidden">
          User Profile
        </h1>

        <h3 className="mb-5 font-montserrat text-sm font-semibold text-[#333] lg:mb-8">
          Profile Picture
        </h3>

        <Avatar name="avatar" />

        <section className="mt-8 lg:hidden">
          <h2 className="mt-8 font-montserrat text-sm font-bold text-[#191919]">Profile Info</h2>

          <ProfileDetailForm />
        </section>
      </section>
      <div className="my-16 h-3 w-full bg-[#f3f9fa] lg:hidden"></div>

      <section className="px-8 lg:hidden">
        <h2 className="font-montserrat text-sm font-bold text-[#191919]">Biodata</h2>

        <BioDataForm />
      </section>

      <div className="my-16 h-3 w-full bg-[#f3f9fa] lg:hidden"></div>

      <section className="px-8 lg:hidden">
        <h2 className="font-montserrat text-sm font-bold text-[#191919]">Health Info</h2>
        <HealthConditionForm
          allergies={loaderData?.allergies}
          health_conditions={loaderData?.health_conditions}
        />
      </section>

      <div className="my-16 h-3 w-full bg-[#f3f9fa] lg:hidden"></div>

      <section className="px-8 lg:hidden">
        <h2 className="font-montserrat text-sm font-bold text-[#191919]">Location Info</h2>

        <LocationForm />
      </section>

      <div className="hidden lg:mt-[50px] lg:block">
        <Tabs defaultValue="profile" className="w-[1000px]">
          <TabsList className="w-[464px] justify-between rounded-none border-b border-[#D0D5DD] !bg-none px-0 font-montserrat font-bold">
            <TabsTrigger className="tab-indicator px-0 font-bold text-[#333]" value="profile">
              Profile Info
            </TabsTrigger>
            <TabsTrigger className="tab-indicator font-bold text-[#333]" value="biodata">
              Biodata
            </TabsTrigger>
            <TabsTrigger className="tab-indicator font-bold text-[#333]" value="health_condition">
              Health Info
            </TabsTrigger>
            <TabsTrigger className="tab-indicator px-0 font-bold text-[#333]" value="location">
              Location Info
            </TabsTrigger>
          </TabsList>
          <TabsContent value="profile">
            <ProfileDetailForm />
          </TabsContent>
          <TabsContent value="biodata">
            <BioDataForm />
          </TabsContent>
          <TabsContent value="health_condition">
            <HealthConditionForm
              allergies={loaderData.allergies}
              health_conditions={loaderData.health_conditions}
            />
          </TabsContent>
          <TabsContent value="location">
            <LocationForm />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
