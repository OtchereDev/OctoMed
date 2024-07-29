import { useState } from 'react'
import { Pencil, Person, Trash } from '../shared/icons'

export default function Avatar({ name }: { name: string }) {
  const [imageUrl, setImageUrl] = useState<undefined | null | string | ArrayBuffer>(undefined)

  const handleImage = (e: any) => {
    if (e) {
      const file = e.target.files[0]

      if (file) {
        const reader = new FileReader()
        reader.onloadend = function () {
          if (reader.result) {
            setImageUrl(() => reader.result)
          }
        }

        reader.readAsDataURL(file)
      }
    }
  }

  const handleClear = () => {
    setImageUrl(() => undefined)
  }

  const Image = (
    <input
      type="file"
      accept="image/*"
      className="absolute left-0 top-0 h-full w-full opacity-0"
      onChange={(e) => {
        handleImage(e)
      }}
      aria-hidden="true"
    />
  )

  return (
    <>
      {imageUrl ? (
        <>
          <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-[#1382a2] bg-opacity-10">
            <img src={imageUrl as string} className="h-full w-full object-cover" />
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              className="relative flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e5f7fe]"
            >
              <Pencil />
              {Image}
            </button>
            <button
              onClick={handleClear}
              type="button"
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e5f7fe]"
            >
              <Trash />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-8">
          <div className="flex h-[100px] w-[100px] items-center justify-center overflow-hidden rounded-full bg-[#1382a2] bg-opacity-10">
            <Person className="size-16 text-primary opacity-50" />
          </div>
          <button
            type="button"
            className="relative rounded-primary border-[1.5px] border-primary px-[35px] py-[10px] font-raleway text-sm font-bold text-primary"
          >
            Upload
            {Image}
          </button>
        </div>
      )}
      <input name={name} value={imageUrl as string} className="hidden" />
    </>
  )
}
