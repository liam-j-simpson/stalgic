import { useState } from 'react'
import AddCapsule from '../components/AddCapsule/AddCapsule'
function AddCapsulePage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [date, setDate] = useState<Date>()
  
  return (
    <section className="flex">
      <div className="m-16">
        <h1 className="font-lalezar text-9xl text-white">CREATE</h1>
        <h2 className="mb-12 font-lalezar text-7xl text-white">
          {title.length <= 0 ? 'CAPSULE' : `${title.toUpperCase()} CAPSULE`}
        </h2>
        <AddCapsule
          setTitle={setTitle}
          title={title}
          description={description}
          setDescription={setDescription}
          tags={tags}
          setTags={setTags}
          date={date}
          setDate={setDate}
        />
      </div>
    </section>
  )
}

export default AddCapsulePage
