import { Dot, Ellipsis, Heart, MessageCircleMore, Reply, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Comments() {
  return (
    <div className="mt-1 flex-1 overflow-scroll rounded-[12px] bg-[#D0D5DD4D] px-[22px] py-[17px] font-montserrat">
      <div className="ml-[10px] flex flex-col border-l">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative pb-5 pl-[30px]">
            <Avatar className="absolute left-0 h-[32px] w-[32px] -translate-x-1/2">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-1 justify-between border-[#D0D5DD] pb-3">
              <p className="font-montserrat text-sm font-medium text-[#4D5061]">
                Daniel @Dannyboah96
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Ellipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[304px] font-montserrat">
                  <DropdownMenuItem className="items-center gap-1 px-[14px] py-[10px] font-medium text-[#101828]">
                    <Reply />
                    Reply Post
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    // onClick={() => setIsDeleteOpen(true)}
                    className="gap-2 px-[14px] py-[10px] font-medium text-[#101828]"
                  >
                    <Trash2 size={18} color="#F04438" />
                    Delete Post
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="border-b pb-5">
              <p className="mt-4 line-clamp-2 text-sm">
                I've been struggling with anxiety, especially during my workouts. What strategies or
                techniques do you use to manage anxiety w...
              </p>

              <div className="mt-5 flex items-center gap-7">
                <div className="flex items-center gap-2">
                  <Heart size={15} fill="#CE0C00" color="#CE0C00" />
                  <p className="text-xs">15 likes</p>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircleMore size={15} />
                  <p className="text-xs">8 comments</p>
                </div>

                <div className="flex items-center gap-[2px] text-xs">
                  <p>Aug 28</p>
                  <Dot />
                  <p>11:35pm</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
