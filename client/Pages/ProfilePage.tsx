import { useViewProfile } from '../hooks/useViewProfile'

function ProfilePage() {
  const { data, isLoading, isError } = useViewProfile()
  console.log('data', data)
  if (isLoading) {
    return <p>Loading</p>
  }
  if (isError) {
    return <p>Error</p>
  }
  if (data) {
    return (
      <>
        <section className="bg-[#13A25B]  pl-16 font-lalezar">
          <div>
            <h1 className="bg-cover pt-20 text-9xl font-bold tracking-wider text-white">
              PROFILE
            </h1>
          </div>
        </section>
        <div
          className={`group m-16 flex h-80 w-80 items-center justify-center rounded-full bg-[#ffffff] p-6 text-[#13A25B]`}
        >
          <img
            src={data.profile_image}
            className="size-40"
            alt="user profile"
          ></img>
          <div className="hidden group-hover:block absolute">
            <button className="rounded-full  bg-[#13A25B] text-[#ffffff]">
              <p className="p-2 px-4 font-labrada text-xl">Edit Photo</p>
            </button>
          </div>
        </div>
        <section className="bg-[#13A25B]  pl-16 font-lalezar">
          <div className="flex">
            <div
              className={`mb-96 mr-12 h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
            >
              <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">
                NAME
              </h2>
              <p className="space-l mb-4 font-labrada text-xl">
                {data.name ? data.name : 'name not found'}
              </p>
              <button className="inline-block rounded-full bg-[#13A25B] p-2 px-4 text-[#ffffff]">
                edit
              </button>
            </div>
            <div
              className={`mb-96 mr-12  h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
            >
              <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">
                EMAIL
              </h2>
              <p className="space-l mb-4 font-labrada text-xl">
                {data.email ? data.email : 'email not found'}
              </p>
              <button className="mr-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff]">
                edit
              </button>
            </div>
            <div
              className={`mb-96 mr-12  h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
            >
              <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">
                DOB
              </h2>
              <p className="space-l mb-4 font-labrada text-xl">
                {data.dob ? data.dob : 'DOB not found'}
              </p>
              <button className="mr-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff]">
                edit
              </button>
            </div>
          </div>
        </section>
      </>
    )
  }
}
export default ProfilePage
