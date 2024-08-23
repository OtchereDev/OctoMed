import { ClientOnly } from 'remix-utils/client-only'
import { VideoBoxData } from '~/routes/channel.$channelId'
import { PageDub } from './PageDub.client'

const Page = ({ data }: { data: VideoBoxData }) => {
  return <ClientOnly fallback={<p>Loading..</p>}>{() => <PageDub data={data} />}</ClientOnly>
}

export default Page
