import { ClientOnly } from 'remix-utils/client-only'
import { VideoBoxData } from '~/routes/_dashboard.health-care-providers.video.$videoId'
import { PageDub } from './PageDub.client'

const Page = ({ data, isDoctor }: { data: VideoBoxData; isDoctor?: boolean }) => {
  return (
    <ClientOnly fallback={<p>Loading..</p>}>
      {() => <PageDub isDoctor={isDoctor} data={data} />}
    </ClientOnly>
  )
}

export default Page
