import { Button } from '../../ui/Button'
import { Input } from '../../ui/Input'
import { Label } from '../../ui/Label'
import TimeFunction from '../Time/TimeFunction'
import { useAddCapsule } from '../../hooks/useAddCapsule'
import { Capsule } from '../../../models/capsule'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'
import { useState } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

interface Props {
  form: {
    title: string
    time: string
    description: string
    tags: string[]
  }
  setForm: React.Dispatch<React.SetStateAction<Capsule>>
}
function AddCapsule({ form, setForm }: Props) {
  const addCapsuleMutation = useAddCapsule()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addCapsuleMutation.mutate({
      title: form.title,
      time: form.time,
      description: form.description,
      tags: form.tags,
    })
    setForm({
      title: '',
      time: '',
      description: '',
      tags: [],
    })
    navigate('/dashboard')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleAddTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newTag = e.currentTarget.value
      setForm({ ...form, tags: [...form.tags, newTag] })
      e.currentTarget.value = ''
    }
  }

  const [date, setDate] = useState(new Date())
  const handleDateChange = (date: Date | null) => {
    if (date) {
      setDate(date)
      setForm({ ...form, time: format(date, 'dd/MM/yyyy HH:mm') })
      console.log('setForm', {
        ...form,
        time: format(date, 'dd/MM/yyyy HH:mm'),
      })
    }
  }

  return (
    <>
      <main className="flex">
        <div
          className={`mb-96 mr-12 flex h-96 w-80 flex-col rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
        >
          <form onSubmit={handleSubmit}>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              placeholder="Enter title"
              value={form.title}
            />
            <br />

            <Label>
              Opening Date
              <br />
              <DatePicker
                selected={date}
                onChange={handleDateChange}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              />
            </Label>

            <br />
            <Label htmlFor="description">Description</Label>
            <Input
              type="description"
              id="description"
              name="description"
              onChange={handleChange}
              placeholder="Enter description"
              value={form.description}
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
                : TimeFunction(format(date, 'dd/MM/yyyy HH:mm'))}
            </h1>

            <p className="space-l font-labrada text-xl">
              {form.title.length <= 0 ? 'Title' : form.title}
            </p>

            <p className="space-l font-labrada text-xl">
              {form.description.length <= 0 ? 'Description' : form.description}
            </p>

            <p className="space-l font-labrada text-xl">
              {form.tags.length <= 0
                ? 'Tags'
                : form.tags.map((item, i) => (
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
