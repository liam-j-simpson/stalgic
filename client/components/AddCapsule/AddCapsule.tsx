// Link to hook
// Smart/Dumb Component
// Reference rcmndr for layout tips

import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { Label } from '../../ui/Label'
import TimeFunction from '../Time/TimeFunction'
import { DatePicker } from '../../ui/DatePicker'
import { useAddCapsule } from '../../hooks/useAddCapsule'
import React, { useState } from 'react'
interface Props {
  setTitle: React.Dispatch<React.SetStateAction<string>>
  setDescription: React.Dispatch<React.SetStateAction<string>>
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  title: string
  description: string
  tags: string[]
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}
function AddCapsule({
  setTitle,
  title,
  setDescription,
  description,
  setTags,
  tags,
  date,
  setDate,
}: Props) {
  // const addCapsuleMutation = useAddCapsule()

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   addCapsuleMutation.mutate({
  //     title,
  //     time,
  //     description,
  //     tags,
  //   })
  // }

  const handleAddTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newTag = e.currentTarget.value
      setTags([...tags, newTag])
      e.currentTarget.value = ''
    }
  }

  //we want to set the date to locale
  //get rid of the comma from the date
  //setDate to a format that works for nikkis function
  //the date needs to be put into the table
  // the time remaining needs to be displayed on screen

  // const handleSetDate = (
  //   e: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  //   setDate = e.currentTarget.value
  // }

  //working on the math function at the moment
  // const dateString = date?.toLocaleString()
  // const newTimeString = dateString?.filter((item) => item !== ',')
  // console.log(newTimeString)

  return (
    <>
      <main className="flex">
        <div
          className={`mb-96 mr-12 flex h-96 w-80 flex-col rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
        >
          <form
          // onSubmit={handleSubmit}
          >
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
            />
            <br />

            <Label>
              Opening Date
              <DatePicker date={date} setDate={setDate}></DatePicker>
            </Label>

            <br />
            <Label htmlFor="description">Description</Label>
            <Input
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="Enter description"
            />
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              placeholder="Enter tags"
              onKeyDown={handleAddTags}
            />

            <Button type="submit">Submit</Button>
          </form>
        </div>
        <div className="w-1/2">
          <div
            className={`mb-96 mr-12 flex h-96 w-80 flex-col rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
          >
            <h1 className="font-lalezar text-5xl">
              {date === undefined
                ? 'Time Remaining'
                : TimeFunction('22/12/2030 14:00')}
            </h1>

            <p className="space-l font-labrada text-xl">
              {title.length <= 0 ? 'Title' : title}
            </p>

            <p className="space-l font-labrada text-xl">
              {description.length <= 0 ? 'Description' : description}
            </p>

            <p className="space-l font-labrada text-xl">
              {tags.length <= 0
                ? 'Tags'
                : tags.map((item, i) => (
                    <li
                      key={i}
                      className="mr-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff]"
                    >
                      {item}
                    </li>
                  ))}
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddCapsule
