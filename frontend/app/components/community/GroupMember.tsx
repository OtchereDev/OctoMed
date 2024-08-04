import { Ellipsis, UserMinus } from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'
import RemoveUser from './RemoveUser'

export default function GroupMember() {
  const [isRemoveOpen, setIsRemoveOpen] = useState(false)
  return (
    <div className="mt-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-[32px] w-[32px]">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <p className="text-sm font-medium">Daniel @Dannyboah96</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Ellipsis />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[304px] font-montserrat">
            <DropdownMenuItem
              onClick={() => setIsRemoveOpen(true)}
              className="items-center gap-3 px-[14px] py-[10px] font-medium text-[#101828]"
            >
              <UserMinus />
              Remove member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <RemoveUser isOpen={isRemoveOpen} closeModal={() => setIsRemoveOpen(false)} />
    </div>
  )
}
