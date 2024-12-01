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

  //we want to set the date to locale
  //get rid of the comma from the date
  //setDate to a format that works for nikkis function
  //the date needs to be put into the table
  // the time remaining needs to be displayed on screen

  // const handleDateChange = (date) => {
  //   setDate(date)

  //   setForm({ ...form, time: [form.time]: date })
  //   console.log(form)
  // }
  const [date, setDate] = useState(new Date())

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
              <DatePicker selected={date} onChange={(date) => setDate(date)} />
            </Label>

            <br />
            <Label htmlFor="description">Description</Label>
            <Input
              type="description"
              id="description"
              name="description"
              onChange={handleChange}
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
