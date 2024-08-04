import { Newspaper, VideoIcon } from 'lucide-react'
import Article from '~/assets/images/articles.jpeg'
import Video from '~/assets/images/video.jpeg'
import Comments from '~/components/community/Comments'
import PostLg from '~/components/community/PostLg'

export default function PostView() {
  return (
    <section className="flex h-full">
      <section className="flex flex-[1.6] flex-col overflow-scroll py-[32px] pr-[29px]">
        <PostLg />
        <Comments />
      </section>

      <section className="h-full flex-1 border-l px-[25px] py-[32px] font-montserrat">
        <h3 className="text-lg font-semibold text-[#333]">Related Topics</h3>
        <div className="mt-5">
          <div className="relative h-[40px] w-full overflow-hidden rounded-full px-[30px] py-[10px]">
            <img src={Article} className="absolute left-0 top-0 h-full w-full object-cover" />
            <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(90deg,rgba(0,1,5,1)0%,rgba(0,1,5,0.2861519607843137)30%)]" />
            <div className="relative flex items-center gap-3 font-montserrat text-white">
              <Newspaper size={18} />
              <p className="font-semibold">Articles</p>
            </div>
          </div>
          <div className="ml-5 mt-3 flex flex-col gap-4 border-l px-5 py-[11px]">
            <p className="pb-1 font-semibold text-primary underline">Anxiety during workout</p>
            <p className="pb-1 font-semibold text-primary underline">Anxiety during workout</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="relative h-[40px] w-full overflow-hidden rounded-full px-[30px] py-[10px]">
            <img src={Video} className="absolute left-0 top-0 h-full w-full object-cover" />
            <div className="absolute left-0 top-0 h-full w-full bg-[linear-gradient(90deg,rgba(0,1,5,1)0%,rgba(0,1,5,0.2861519607843137)30%)]" />
            <div className="relative flex items-center gap-3 font-montserrat text-white">
              <VideoIcon size={18} fill="white" />
              <p className="font-semibold">Videos</p>
            </div>
          </div>
          <div className="ml-5 mt-3 flex flex-col gap-4 border-l px-5 py-[11px]">
            <p className="pb-1 font-semibold text-primary underline">Anxiety during workout</p>
            <p className="pb-1 font-semibold text-primary underline">Anxiety during workout</p>
          </div>
        </div>
      </section>
    </section>
  )
}
