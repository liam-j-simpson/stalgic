import { useState } from 'react'
import AddCapsule from '../components/AddCapsule/AddCapsule'
function AddCapsulePage() {
  //include all the hooks and smart data that gets passed to the apis
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState('')
  const [title, setTitle] = useState('')
  const [date, setDate] = useState<Date>()

  console.log('description', description)
  console.log('tags', tags)
  console.log('title', title)
  console.log('date', date)

  return (
    <body>
      <h1 className="font-lalezar text-9xl">Create a Capsule</h1>
      <section className="flex">
        <div className="w-96 flex-col ">
          <AddCapsule
            setTitle={setTitle}
            setDescription={setDescription}
            setTags={setTags}
            setDate={setDate}
            date={date}
          />
        </div>
        <div className="flex-col ">Title</div>
      </section>
    </body>
  )
}

export default AddCapsulePage
