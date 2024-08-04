import Shield from '~/assets/images/shield.png'
import { Dialog, DialogContent, DialogDescription } from '../ui/dialog'

export default function WelcomeCommunity() {
  return (
    <Dialog>
      <DialogContent className="w-[calc(100%-20px)] !rounded-[20px] text-left lg:!w-[723px]">
        <DialogDescription className="font-montserrat">
          <img src={Shield} className="mx-auto mt-[50px] h-[200px] w-[200px]" />
          <h3 className="mt-[20px] text-center font-raleway text-base font-semibold text-primary lg:text-2xl">
            Verified by Professionals!
          </h3>
          <div className="mx-auto mt-[25px] max-w-[450px] text-center font-montserrat text-base font-medium leading-[1.4] text-[#4D5061] lg:pb-[67px]">
            <p>
              Welcome to the Octomed Community Look out for this badge next to the comments and
              posts -
            </p>
            <p className="mt-2">
              These are verified by our health professionals It’s our way of ensuring that you get
              trusted advice!
            </p>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
