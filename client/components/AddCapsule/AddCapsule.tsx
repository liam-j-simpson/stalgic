// Link to hook
// Smart/Dumb Component
// Reference rcmndr for layout tips

import { useState } from 'react'
import { Button } from '../../ui/Button'
import { DatePicker } from '../../ui/DatePicker'
import { Input } from '../../ui/Input'
import { Label } from '../../ui/Label'
import { useAddCapsule } from '../../hooks/useAddCapsule'
import { Accordion } from '../../ui/Accordian'
interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
  date: Date | undefined
  title: string
  tags: string[]
  description: string
}
function AddCapsule({
  setTitle,
  title,
  setDescription,
  description,
  setTags,
  tags,
  setDate,
  date,
}: Props) {
  //multi input function

  // const handleAddCapsule = useAddCapsule(a)

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   handleAddCapsule.mutate({
  //     title: title,
  //     description: description,
  //     tags: tags,
  //   })
  // }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleTagsChange = (e) => {
    setTags(e.target.value)
  }

  return (
    <>
      <main className="flex">
        <div
          className={`mb-96 mr-12 flex h-96 w-80 flex-col rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
        >
          <form>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              onChange={handleTitleChange}
              placeholder="Enter title"
            />
            <br />
            <Label>
              Opening Date
              <DatePicker setDate={setDate} date={date}></DatePicker>
            </Label>
            <br />
            <Label htmlFor="description">Description</Label>
            <Input
              onChange={handleDescriptionChange}
              id="description"
              placeholder="Enter description"
            />
            <Label htmlFor="tags">Tags</Label>
            <Input
              onChange={handleTagsChange}
              id="tags"
              placeholder="Enter tags"
            />

            {/* <Button onSubmit={handleSubmit}>Submit</Button> */}
          </form>
        </div>
        <div className="w-1/2">
          <div
            className={`mb-96 mr-12 flex h-96 w-80 flex-col rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
          >
            <h1 className="font-lalezar text-5xl">
              {date === undefined ? 'Time Remaining' : date?.toLocaleString()}
            </h1>

            <p className="font-labrada space-l text-xl">
              {title.length <= 0 ? 'Title' : title}
            </p>

            <p className="font-labrada space-l text-xl">
              {description.length <= 0 ? 'Description' : description}
            </p>

            <p className="font-labrada space-l text-xl">
              {tags.length <= 1 ? 'Tags' : tags}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddCapsule
