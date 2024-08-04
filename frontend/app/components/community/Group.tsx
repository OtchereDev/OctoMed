import { Link } from '@remix-run/react'
import { ChevronRight, MessageCircleMore, UsersRound } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import JoinGroup from './JoinGroup'

export default function Group() {
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
      <div className="ml-[55px]">
        <p className="mt-3 line-clamp-2 text-sm">
          This group is dedicated to individuals passionate about health, fitness, and well-being.
          Whether you're just starting your journey or are a seasoned wellness enthusiast, this..
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-7 pb-3">
            <div className="mt-5 flex items-center gap-2">
              <UsersRound size={15} />
              <p className="text-xs">8 members</p>
            </div>
            <div className="mt-5 flex items-center gap-2">
              <MessageCircleMore size={15} />
              <p className="text-xs">240 chats</p>
            </div>
          </div>
          <JoinGroup>
            <button className="rounded-[4px] bg-primary px-4 py-2 text-[13px] font-bold text-white">
              Join
            </button>
          </JoinGroup>
        </div>
      </div>
    </div>
  )
}
