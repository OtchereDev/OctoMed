import { Link } from '@remix-run/react'
import { ArrowLeft } from 'lucide-react'

export default function Library() {
  return (
    <section className="px-5 pb-28 pt-5">
      <Link className="mb-4 flex items-center gap-2 font-semibold" to="/library">
        <ArrowLeft size={18} strokeWidth={2.5} />
        Back
      </Link>
      <div className="relative h-[150px] overflow-hidden rounded-[16px] p-4 lg:p-6">
        <img
          className="absolute left-0 top-0 h-full w-full object-cover"
          src="https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
        <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-70" />
        <div className="relative flex h-full w-full flex-col justify-between">
          <Link className="hidden lg:block" to="/library">
            <button className="flex items-center gap-2 font-semibold text-white">
              <ArrowLeft size={18} strokeWidth={2.5} />
              Back
            </button>
          </Link>
          <div className="overflow-hidden font-montserrat text-white">
            <h1 className="text-2xl font-semibold">Article Title Goes Here</h1>
            <p className="mt-2 line-clamp-3 font-medium lg:line-clamp-1">
              Donec dictum convallis odio. Donec eu nunc eu est faucibus elementum. Mauris in risus
              aliquet, luctus arcu a, maximus nulla.
            </p>
          </div>
        </div>
      </div>

      <h1 className="mt-10 font-montserrat text-2xl font-bold text-[#191919]">Here Goes A Title</h1>
      <p className="mt-4 text-justify font-montserrat text-[#4D5061]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent rhoncus elit ac enim
        faucibus convallis. Mauris et ex vel odio vehicula pretium. Sed non felis et neque lobortis
        mattis non in tellus. Donec libero nunc, posuere id leo sit amet, consectetur consequat
        metus. Pellentesque fringilla nec arcu a dapibus. Etiam eu luctus arcu. Aliquam congue purus
        quis lobortis consequat. Pellentesque sed fringilla odio. Pellentesque diam lacus, lobortis
        vel fringilla in, imperdiet eu enim. Phasellus aliquam urna non nisi dictum, vel bibendum
        tellus pulvinar. Morbi aliquet tellus sapien, ut placerat ligula vestibulum ut. Morbi
        faucibus vehicula ligula eu facilisis. Cras sagittis eu arcu quis facilisis. Aliquam dictum
        id odio a placerat. Donec sed massa efficitur, volutpat mauris in, orttitor turpis. Donec ut
        laoreet tortor. Nam at fringilla erat, eget feugiat mauris.
      </p>

      <div className="mx-auto mt-10 h-[383px] overflow-scroll rounded-xl lg:w-[574.5px]">
        <img
          className="h-full w-full object-cover"
          src="https://images.pexels.com/photos/3714743/pexels-photo-3714743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        />
      </div>
      <p className="text-center font-montserrat text-[#4D5061]">Pellentesque sed fringilla odio.</p>
    </section>
  )
}
