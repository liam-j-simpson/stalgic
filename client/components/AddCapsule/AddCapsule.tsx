// Link to hook
// Smart/Dumb Component
// Reference rcmndr for layout tips

// import { useState } from 'react'
import { Button } from '../../ui/Button'
import { DatePicker } from '../../ui/DatePicker'

function AddCapsule() {
  //multi input function

  // const [setTitle, Title] = useState('')
  // const [setDescription, Description] = useState('')
  // const [setTags, Tags] = useState('')

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   useAddCapsule()
  // }

  return (
    <>
      <main>
        <form></form>
        {/* title input */}
        <DatePicker></DatePicker>
        <br/>
        {/* description input */}
        {/* tags input */}
        <Button>Submit</Button>
      </main>
    </>
  )
}

export default AddCapsule
