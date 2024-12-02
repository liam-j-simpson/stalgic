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
            <h1 className="pt-20 text-9xl font-bold tracking-wider text-white">
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
          <div className="absolute hidden group-hover:block">
            <button className="rounded-full  bg-[#13A25B] text-[#ffffff]">
              <p className="p-2 px-4 font-labrada text-xl">Edit Photo</p>
            </button>
          </div>
        </div>

        <section className="bg-[#13A25B] bg-[#13A25B] pb-12  pl-16 font-lalezar">
          <div className="flex">
            <div
              className={`mb-8 mr-12 h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
            >
              <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">
                NAME
              </h2>
              <p className="space-l mb-4 font-labrada text-xl">
                {data.name ? data.name : 'name not found'}
              </p>
            </div>
            <div
              className={`mb-8 mr-12  h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
            >
              <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">
                EMAIL
              </h2>
              <p className="space-l mb-4 font-labrada text-xl">
                {data.email ? data.email : 'email not found'}
              </p>
            </div>
            <div
              className={`mb-8 mr-12  h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
            >
              <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">
                DOB
              </h2>
              <p className="space-l mb-4 font-labrada text-xl">
                {data.dob ? data.dob : 'DOB not found'}
              </p>
            </div>
          </div>
          <button className="rounded-full bg-[#ffffff] px-8 py-2 text-3xl text-[#13A25B]">
            edit
          </button>
        </section>
      </>
    )
  }
}
export default ProfilePage
