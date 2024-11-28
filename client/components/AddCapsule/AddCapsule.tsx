// Link to hook
// Smart/Dumb Component
// Reference rcmndr for layout tips

import { useState } from 'react'

function AddCapsule() {
  //multi input function

  const [setTitle, Title] = useState('')
  const [setDescription, Description] = useState('')
  const [setTags, Tags] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    useAddCapsule()
  }

  return (
    <>
      <main>
        <form onSubmit={handleSubmit}></form>
      </main>
    </>
  )
}

export default AddCapsule
