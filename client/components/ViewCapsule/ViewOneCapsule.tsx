import { useParams } from 'react-router-dom'
import { useViewCapsuleById } from '../../hooks/useViewCapsule'

function ViewOneCapsule() {
  const { id } = useParams()

  const { data, isLoading, isError } = useViewCapsuleById(Number(id))

  // TODO: render the information from the capsule that has been clicked on (onto this page)

  if (isLoading) {
    return <p>Capsules coming soon...</p>
  }

  if (isError) {
    return <p>Please try again later... </p>
  }


  return (
    <>
      <section className="bg-[#13A25B] pl-16 font-lalezar">
        <div className="flex flex-row">
          <h1 className="be-cover pt-20 font-lalezar text-9xl font-bold tracking-wider text-white">
            UPLOAD
          </h1>
        </div>

        <div className="mr-16 flex flex-row justify-between">
          <div className="relative h-[32rem] w-2/3 rounded-lg border-8 border-dashed border-white">
            <h1 className="relative left-1/2 top-1/2 justify-center text-white">
              Drag and drop to upload files
            </h1>
          </div>

          <div className="ml-8 w-1/3 rounded-lg bg-[#ffffff]">
          <h2 className="pb-2 pt-4 font-bold">{data?.title}</h2>
            <p>{data?.description}</p>
          </div>
          <ul>
            {data?.tags.map((item, idx) => (
              <li
                key={idx}
                className='mr-2 inline-block rounded-full px-4 py-2 pt-2 ${data.tagBg} ${data.tagText}'
              >
                {item}
              </li>
            ))}
          </ul>
          </div>
      </section>
    </>
  )
}

export default ViewOneCapsule
