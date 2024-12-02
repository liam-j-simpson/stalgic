import { useState } from 'react'
import { CapsuleData } from '../../../models/capsule'
import useEditCapsule from '../../hooks/useEditCapsule'

interface Props {
  capsuleId: number
  initialData: CapsuleData
}

function UpdateCapsule({ capsuleId, initialData }: Props) {
  const { mutate: updateCapsuleInfo } = useEditCapsule(capsuleId)

  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState(initialData)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateCapsuleInfo(formData)
    setEditing(false)
  }

  return (
    <>
      <div className="flex pb-4 font-lalezar">
        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#13A25B] p-2 focus:border-[#FE5801] focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
              placeholder="Edit Title"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full rounded-lg border border-[#13A25B] p-2 focus:border-[#FE5801] focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
              placeholder="Edit Description"
            />
            <input
              type="text"
              name="tags"
              value={formData.tags.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  tags: e.target.value.split(',').map((tag) => tag.trim()),
                }))
              }
              className="w-full rounded-lg border border-[#13A25B] p-2 focus:border-[#FE5801] focus:outline-none focus:ring-2 focus:ring-[#FFA500]"
              placeholder="Edit Tags (comma-separated)"
            />
            <div className="flex space-x-4">
              <button
                type="submit"
                className="rounded-full bg-[#13A25B] px-4 py-2 text-white hover:bg-[#0f7c47]"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="rounded-full bg-[#FE5801] px-4 py-2 text-white hover:bg-[#D94E01]"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="ml-4 rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-white hover:bg-[#FE5801]"
          >
            EDIT
          </button>
        )}
      </div>
    </>
  )
}

export default UpdateCapsule
