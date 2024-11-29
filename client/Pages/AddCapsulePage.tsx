import { useState } from 'react'
import AddCapsule from '../components/AddCapsule/AddCapsule'
function AddCapsulePage() {
  //include all the hooks and smart data that gets passed to the apis
  const [description, setDescription] = useState('')
  const [tags, setTags] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState<Date>()

  console.log('description', description)
  console.log('tags', tags)
  console.log('title', title)
  // console.log('date', typeof )
  
  return (
    <body>
      <section className="flex">
        <div className="m-16">
          <h1 className="font-lalezar text-9xl text-white">CREATE</h1>
          <h2 className="font-lalezar mb-12 text-7xl text-white">{title.length <= 0 ? 'CAPSULE' : `${title.toUpperCase()} CAPSULE`}</h2>
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
    </body>
  )
}

export default AddCapsulePage
