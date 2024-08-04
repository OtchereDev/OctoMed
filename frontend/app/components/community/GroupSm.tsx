import { Link } from '@remix-run/react'
import { ChevronRight, MessageCircleMore, UsersRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function GroupSm() {
  return (
    <div className="rounded-[12px] bg-[#D0D5DD4D] px-[24px] py-[15px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[13px]">
          <Avatar className="h-[45px] w-[45px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="font-montserrat font-semibold">Concord Health Generals</p>
        </div>
        <Link to={'/community/group/fhfjfjd'}>
          <ChevronRight className="text-primary" />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center gap-7 pb-3">
          <div className="flex items-center gap-2">
            <UsersRound size={15} />
            <p className="text-xs">8 members</p>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircleMore size={15} />
            <p className="text-xs">240 chats</p>
          </div>
        </div>
        <button className="mt-6 w-full flex-1 rounded-[8px] border border-primary px-4 py-3 text-[13px] font-bold text-primary">
          Join
        </button>
      </div>
    </div>
  )
}
