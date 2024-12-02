import { MediaData } from "../../../models/media"
import { useAddMedia } from "../../hooks/useAddMedia"


function AddMedia() {
  const {mutate: addNewMedia} = useAddMedia()

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)

    const capsule_id = form.get('capsule_id')?.valueOf() as number
    const image_url = form.get('image_url')?.valueOf() as string

    const media: MediaData = {
      capsule_id,
      image_url
    }

    addNewMedia({media})
  }

  return (
    <>
    <div className="flex h-[32rem] w-2/3 items-center justify-center rounded-lg border-8 border-dashed border-white">
    <form className="items-center justify-center flex" onSubmit={handleUpload}>
      <input className="flex text-white" type="file" name="file" accept="image/*" required/>
      <button type="submit">Upload</button>
    </form>
    </div>
    </>
  )
}

export default AddMedia
