import { useState } from 'react'
import AddCapsule from '../components/AddCapsule/AddCapsule'
import { Capsule } from '../../models/capsule'
function AddCapsulePage() {
  const [form, setForm] = useState<Capsule>({
    title: '',
    time: '',
    description: '',
    tags: [],
  })

  return (
    <section className="bg-[#13A25B]  pl-16 font-lalezar">
      <div>
        <h1 className="bg-cover pt-20 text-9xl font-bold tracking-wider text-white">
          CREATE
        </h1>
        <h2 className="mb-12 font-lalezar text-7xl text-white">
          {form.title.length <= 0
            ? 'CAPSULE'
            : `${form.title.toUpperCase()} CAPSULE`}
        </h2>
        <AddCapsule form={form} setForm={setForm} />
      </div>
    </section>
  )
}

export default AddCapsulePage
