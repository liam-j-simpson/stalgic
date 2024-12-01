// import { useParams } from 'react-router-dom'
// import { useViewCapsuleById } from '../../hooks/useViewCapsule'
import { CapsuleData } from '../../../models/capsule'
import TimeFunction from '../Time/TimeFunction'

function ViewOneCapsule() {
  // TODO: link up to database once create a capsule is available

  // const { id } = useParams()
  // const { data, isLoading, isError } = useViewCapsuleById(Number(id))

  // if (isLoading) {
  //   return <p>Capsules coming soon...</p>
  // }

  // if (isError) {
  //   return <p>Please try again later... </p>
  // }

  // FAKE DATA TO DELETE
  const dataFake: CapsuleData = {
    title: 'Guasha Progress',
    time: '22/12/2025 14:00',
    description: 'Contour that face',
    status: 'unlocked',
    tags: ['health', 'wellbeing'],
    id: 1,
  }

  const time = TimeFunction(dataFake.time)

  return (
    <>
      <section className="bg-[#13A25B] pl-16 font-lalezar">
        <div className="flex flex-row">
          <h1 className="be-cover pt-20 font-lalezar text-9xl font-bold tracking-wider text-white">
            UPLOAD
          </h1>
        </div>

        <div className="mr-16 flex flex-row">
          <div className="flex h-[32rem] w-2/3 items-center justify-center rounded-lg border-8 border-dashed border-white">
            <h1 className="flex text-white">Drag and drop to upload files</h1>
          </div>

          <div className="ml-8 flex w-1/3 flex-col rounded-lg bg-[#ffffff]">
            <h2 className="p-4 pb-2 text-[48px] font-bold text-[#13A25B] hover:text-[#FE5801]">
              {dataFake?.title}
            </h2>
            <div className="pl-4 text-[#13A25B] hover:text-[#FE5801]">
              {time}
            </div>
            <p className="p-4 pb-2 text-2xl text-[#13A25B] hover:text-[#FE5801]">
              {dataFake?.description}
            </p>
            <ul className="">
              {dataFake?.tags.map((item, idx) => (
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

export default ViewOneCapsule
