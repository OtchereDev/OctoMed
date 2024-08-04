import { MessageSquarePlus, SquarePen, UserPlus } from 'lucide-react'
import Community from '~/assets/images/community.jpeg'
import DeleteGroup from '~/components/community/DeleteGroup'
import GroupMember from '~/components/community/GroupMember'
import Post from '~/components/community/Post'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'

export default function GroupDetail() {
  return (
    <section className="mt-5 font-montserrat">
      <div className="relative w-full rounded-[16px] border">
        <div className="relative h-[150px] w-full overflow-hidden rounded-[16px] px-6 py-[18px]">
          <img className="absolute left-0 top-0 h-full w-full object-cover" src={Community} />
          <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-70" />
          <div className="relative flex h-full w-full flex-col justify-between">
            <div className="flex items-center gap-6">
              <div className="font-montserrat font-semibold text-white">
                <h3 className="lg:text-xl">The Diabeaters</h3>
              </div>
              <div className="h-6 w-[1px] bg-white" />
              <div className="flex items-center gap-4">
                <p className="font-montserrat font-semibold text-white">16 members</p>
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
            </div>
            <div className="flex justify-end gap-4">
              <button className="flex items-center gap-[10px] rounded-primary bg-primary px-7 py-3 font-bold text-white lg:w-auto lg:flex-none lg:px-8">
                <UserPlus />
                Add Member
              </button>
            </div>
          </div>
        </div>
        <Avatar className="absolute bottom-0 left-8 h-[82px] w-[82px] translate-y-1/2 border-4 border-white">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
      <div className="mt-16 flex border-t">
        <div className="flex-[1.7] pb-10 pr-[61px] pt-4">
          <div className="flex items-center gap-4">
            <p className="font- text-xl font-bold text-[#333]">Group Description</p>
            <SquarePen color="#1282A2" />
          </div>
          <p className="mt-3 text-sm text-[#4D5061]">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit
            interdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos.
          </p>

          <div className="mt-10">
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-[#333]">Chat</p>
              <button className="flex items-center gap-2 font-semibold text-primary underline">
                <MessageSquarePlus size={18} color="#1282A2" />
                New Post
              </button>
            </div>
            <div className="mt-[34px] flex max-h-[500px] flex-col gap-8 overflow-y-scroll">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Post key={idx} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 border-l py-6 pl-6">
          <p className="font-semibold">Group Members (8)</p>
          {Array.from({ length: 5 }).map((_, idx) => (
            <GroupMember key={idx} />
          ))}

          <DeleteGroup>
            <button className="mt-10 w-full rounded-primary border py-4 font-bold text-[#667085]">
              Delete Group
            </button>
          </DeleteGroup>
        </div>
      </div>
    </section>
  )
}
