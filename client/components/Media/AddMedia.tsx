import { useState } from 'react'
import { PostMediaData } from '../../../models/media'
import { useAddMedia } from '../../hooks/useAddMedia'

interface Props {
  capsuleId: number
}

function AddMedia(props: Props) {
  const { mutate: addNewMedia } = useAddMedia()
  const [showUploadButton, setShowUploadButton] = useState(false)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    const file = form.get('file')?.valueOf() as Blob

    const media: PostMediaData = {
      capsule_id: props.capsuleId,
      file,
    }

    addNewMedia({ media })
  }

  return (
    <>
      <div className="flex h-[32rem] w-2/3 items-center justify-center rounded-lg border-8 border-dashed border-white">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleUpload}
        >
          <input
            className="flex text-white"
            type="file"
            name="file"
            accept="image/*"
            onChange={() => setShowUploadButton(true)}
            required
          />
          {showUploadButton && (
            <button
              className="mt-4 rounded-full px-4 py-2 pt-2 text-white hover:bg-[#FE5801] hover:text-[#ffffff]"
              type="submit"
            >
              Upload
            </button>
          )}
        </form>
      </div>
    </>
  )
}

export default AddMedia
