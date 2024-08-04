import { Link } from '@remix-run/react'
import { Heart, MessageCircleMore, Plus, Search } from 'lucide-react'
import CreateGroup from '~/components/community/CreateGroup'
import CreatePost from '~/components/community/CreatePost'
import Post from '~/components/community/Post'
import WelcomeCommunity from '~/components/community/WelcomeCommunity'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

export default function Community() {
  return (
    <section className="lg:pt-5">
      <div className="relative w-full rounded-[16px] border">
        <div className="relative h-full min-h-[150px] w-full overflow-hidden rounded-[16px] px-6 py-[18px]">
          <img
            className="absolute left-0 top-0 h-full w-full object-cover"
            src="https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-70" />
          <div className="relative flex h-full w-full flex-col justify-between">
            <div>
              <div className="font-montserrat font-semibold text-white">
                <h3 className="lg:text-lg">Hi, Daniel</h3>
                <p className="mt-3 text-sm">
                  Would you like to share something with the community?
                </p>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <CreatePost>
                <button className="flex items-center gap-[10px] rounded-primary bg-primary px-7 py-3 font-bold text-white lg:w-auto lg:flex-none lg:px-8">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-dashed">
                    <Plus />
                  </div>
                  Create A Post
                </button>
              </CreatePost>
              <CreateGroup>
                <button className="flex items-center gap-[10px] rounded-primary border-2 border-white px-7 py-3 font-bold text-white lg:w-auto lg:flex-none lg:px-8">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-dashed">
                    <Plus />
                  </div>
                  Create A Group
                </button>
              </CreateGroup>
            </div>
          </div>
        </div>
        <Avatar className="absolute bottom-0 left-8 h-[82px] w-[82px] translate-y-1/2 border-4 border-white">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>

      <div className="mt-[48px]">
        <div className="flex justify-end gap-2">
          <div className="flex items-center gap-3 rounded-primary border px-[14px] py-[10px] lg:w-[418px]">
            <Search strokeWidth={2.5} size={18} />
            <input
              type="text"
              placeholder="Search posts or groups"
              className="flex-1 font-montserrat outline-none placeholder:font-montserrat"
            />
          </div>
        </div>

        <div className="mt-[22px] flex gap-[46px] font-montserrat">
          <div className="flex-[1.35] rounded-[20px] border border-[#D9D9D9] p-[25px]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#333]">Your Recent Posts</h2>
              <Link to={'/'} className="text-sm font-bold text-primary underline">
                View Community Posts
              </Link>
            </div>
            <div className="mt-[39px] flex items-center gap-[15px]">
              <p className="text-sm font-medium">Filter by:</p>
              <div className="flex items-center gap-3">
                {['General Health', 'Diet', 'Fitness', 'Other'].map((i, idx) => (
                  <span
                    className={`rounded-full ${idx == 0 ? 'bg-[#09AEF21A]' : 'bg-[#F2F4F7]'} px-[10px] py-[2px] text-sm font-medium text-primary`}
                    key={i}
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-[34px] flex max-h-[500px] flex-col gap-8 overflow-y-scroll">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Post key={idx} />
              ))}
            </div>
          </div>

          <div className="flex-1 flex-col rounded-[20px] border border-[#D9D9D9]">
            <div className="flex items-center justify-between border-b px-[25px] py-[22px]">
              <h2 className="text-lg font-semibold text-[#333]">Groups</h2>
              <Link
                to={'/community/groups'}
                className="flex items-center gap-2 text-sm font-bold text-primary underline"
              >
                <Search size={15} />
                Explore Groups
              </Link>
            </div>
            <div className="flex max-h-[580px] flex-1 flex-col gap-8 overflow-y-scroll p-[25px]">
              <div className="rounded-[12px] bg-[#D0D5DD4D] p-[18px]">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-[#4D5061]">Diabeaters</p>
                  <div className="flex">
                    {[1, 2, 3, 4].map((i, idx) => (
                      <Avatar
                        className={`h-[27px] w-[27px] border border-white ${idx > 0 ? '-ml-2' : ''}`}
                      >
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>

                <div className="mt-[22px] flex items-center gap-[10px]">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-montserrat text-sm font-medium text-[#4D5061]">
                    Daniel @Dannyboah96
                  </p>
                </div>

                <div className="ml-[35px]">
                  <p className="mt-4 line-clamp-2 text-[13px]">
                    I've been struggling with anxiety, especially during my workouts. What
                    strategies or techniques do you use to manage anxiety w...
                  </p>

                  <div className="flex items-center gap-7">
                    <div className="mt-5 flex items-center gap-2">
                      <Heart size={15} fill="#CE0C00" color="#CE0C00" />
                      <p className="text-xs">15 likes</p>
                    </div>
                    <div className="mt-5 flex items-center gap-2">
                      <MessageCircleMore size={15} />
                      <p className="text-xs">8 comments</p>
                    </div>
                  </div>
                </div>
              </div>

              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-[12px] bg-[#D0D5DD4D] p-[18px]">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-[#4D5061]">Health N Wealth</p>
                    <div className="flex">
                      {[1, 2, 3, 4].map((i, idx) => (
                        <Avatar
                          className={`h-[27px] w-[27px] border border-white ${idx > 0 ? '-ml-2' : ''}`}
                        >
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-[10px]">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5CB5C]">
                        <p className="font-xs font-raleway font-bold text-[#4D5061]">6</p>
                      </div>
                      <p className="font-raleway text-xs font-semibold text-[#4D5061]">
                        New Activity
                      </p>
                    </div>

                    <p className="text-sm font-medium text-[#4D5061]">8 members</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <WelcomeCommunity />
    </section>
  )
}
