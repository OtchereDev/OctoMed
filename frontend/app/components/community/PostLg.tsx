import {
  Dot,
  Ellipsis,
  EyeOff,
  FlagIcon,
  Heart,
  MessageCircleMore,
  Reply,
  Send,
} from 'lucide-react'
import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem } from '~/components/ui/accordion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import RemovePost from './RemovePost'

export default function PostLg() {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [replyPost, setReplyPost] = useState<string>()

  return (
    <div className="rounded-[12px] bg-[#D0D5DD4D] px-[18px] py-[25px] font-montserrat">
      <div className="flex items-center gap-[10px]">
        <Avatar className="h-[45px] w-[45px]">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 justify-between border-b border-[#D0D5DD] pb-3">
          <p className="font-montserrat font-medium text-[#4D5061]">Daniel @Dannyboah96</p>
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
                <EyeOff size={18} />
                Remove
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteOpen(true)}
                className="gap-2 px-[14px] py-[10px] font-medium text-[#101828]"
              >
                <FlagIcon fill="#F04438" color="#F04438" size={18} />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="ml-[60px]">
        <p className="mt-4 line-clamp-2 text-sm">
          I've been struggling with anxiety, especially during my workouts. What strategies or
          techniques do you use to manage anxiety w...
        </p>

        <div className="mt-5 flex items-center gap-7">
          <div className="flex items-center gap-2">
            <Heart size={15} fill="#CE0C00" color="#CE0C00" />
            <p className="text-xs">15 likes</p>
          </div>
          <button
            onClick={() => setReplyPost((curr) => (curr?.length ? undefined : 'reply'))}
            className="flex items-center gap-2"
          >
            <MessageCircleMore size={15} />
            <p className="text-xs">8 comments</p>
          </button>

          <div className="flex items-center gap-[2px] text-xs">
            <p>Aug 28</p>
            <Dot />
            <p>11:35pm</p>
          </div>
        </div>
      </div>

      <Accordion value={replyPost} type="single" onValueChange={setReplyPost} collapsible>
        <AccordionItem value="reply" className="border-none">
          <AccordionContent className="mt-4 border-t-4 border-t-white pt-4">
            <div className="mt-6 flex h-[175px] w-full resize-none flex-col overflow-hidden rounded-[20px] border bg-white p-[15px]">
              <p className="mb-2 font-poppins text-xs text-[#667085]">Post Reply</p>
              <textarea
                className="w-full flex-1 resize-none outline-none"
                placeholder="What’s on your mind?"
              />
            </div>
            <div className="mt-6 flex gap-4">
              <button className="flex items-center gap-2 rounded-primary bg-[#1282A2] px-8 py-4 font-raleway font-bold text-white">
                <Send size={18} /> Send Reply
              </button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <RemovePost isOpen={isDeleteOpen} closeModal={() => setIsDeleteOpen(false)} />
    </div>
  )
}
