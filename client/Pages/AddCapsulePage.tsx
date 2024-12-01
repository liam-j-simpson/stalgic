import { useState } from 'react'
import AddCapsule from '../components/AddCapsule/AddCapsule'
import { Capsule } from '../../models/capsule'
function AddCapsulePage() {
  const [form, setForm] = useState<Capsule>({
    title: '',
    time: '',
    description: '',
    tags: [],
    status: 'unlocked'
  })

  return (
    <section className="flex">
      <div className="m-16">
        <h1 className="font-lalezar text-9xl text-white">CREATE</h1>
        <h2 className="mb-12 font-lalezar text-7xl text-white">
          {form.title.length <= 0 ? 'CAPSULE' : `${form.title.toUpperCase()} CAPSULE`}
        </h2>
        <AddCapsule
          form={form}
          setForm={setForm}
        />
      </div>
    </section>
  )
}

export default AddCapsulePage
