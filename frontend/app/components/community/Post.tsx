import { Ellipsis, Heart, MessageCircleMore, Reply, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import DeletePost from './DeletePost'

export default function Post() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  return (
    <div className="rounded-[12px] bg-[#D0D5DD4D] px-[18px] py-[15px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[10px]">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-montserrat text-sm font-medium text-[#4D5061]">Daniel @Dannyboah96</p>
        </div>
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
              onClick={() => setIsDeleteOpen(true)}
              className="gap-2 px-[14px] py-[10px] font-medium text-[#101828]"
            >
              <Trash2 size={18} color="#F04438" />
              Delete Post
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DeletePost isOpen={isDeleteOpen} closeModal={() => setIsDeleteOpen(false)} />
      <div className="ml-[35px]">
        <p className="mt-4 line-clamp-2 text-[13px]">
          I've been struggling with anxiety, especially during my workouts. What strategies or
          techniques do you use to manage anxiety w...
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
  )
}
