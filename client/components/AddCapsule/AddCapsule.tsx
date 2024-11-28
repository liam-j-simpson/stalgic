// Link to hook
// Smart/Dumb Component
// Reference rcmndr for layout tips

import { useState } from 'react'
import { Button } from '../../ui/Button'
import { DatePicker } from '../../ui/DatePicker'
import { Input } from '../../ui/Input'
import { Label } from '../../ui/Label'
import { useAddCapsule } from '../../hooks/useAddCapsule'

function AddCapsule({ setTitle, setDescription, setTags, setDate, date }) {
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
      <main>
        <form></form>
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
        <Input onChange={handleTagsChange} id="tags" placeholder="Enter tags" />

        {/* <Button onSubmit={handleSubmit}>Submit</Button> */}
      </main>
    </>
  )
}

export default AddCapsule
