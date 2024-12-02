import { useParams } from 'react-router-dom'
import { useViewCapsuleById } from '../../hooks/useViewCapsule'
import AddMedia from '../Media/AddMedia'

function ViewOneCapsule() {
  const { id } = useParams()
  const { data, isLoading, isError } = useViewCapsuleById(Number(id))

  if (isLoading) {
    return <p>Capsules coming soon...</p>
  }

  if (isError) {
    return <p>Please try again later...</p>
  }

  if (data) {
    return (
      <>
        <section className="bg-[#13A25B] pl-16 font-lalezar">
          <div className="flex flex-row">
            <h1 className="be-cover pt-20 font-lalezar text-9xl font-bold tracking-wider text-white">
              UPLOAD
            </h1>
          </div>

          <div className="mr-16 flex flex-row">
            <AddMedia />

            <div className="ml-8 flex w-1/3 flex-col rounded-lg bg-[#ffffff]">
              <h2 className="p-4 pb-2 text-[48px] font-bold text-[#13A25B] hover:text-[#FE5801]">
                {data.title}
              </h2>
              <div className="pl-4 text-[#13A25B] hover:text-[#FE5801]">
                {data.time}
              </div>
              <p className="p-4 pb-2 text-2xl text-[#13A25B] hover:text-[#FE5801]">
                {data.description}
              </p>
              <ul className="">
                {data?.tags.map((item: string, idx: number) => (
                  <li
                    key={idx}
                    className="m-4 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff] hover:bg-[#FE5801] hover:text-[#ffffff]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </>
    )
  }
}

export default ViewOneCapsule
