export function ProfilePage() {
  //some code

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
        <div className="hidden group-hover:block">
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
            <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">NAME</h2>
            <p className="space-l mb-4 font-labrada text-xl">Username</p>
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
            <p className="space-l mb-4 font-labrada text-xl">user@email.com</p>
            <button className="mr-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff]">
              edit
            </button>
          </div>
          <div
            className={`mb-96 mr-12  h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
          >
            <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">DOB</h2>
            <p className="space-l mb-4 font-labrada text-xl">11/11/11</p>
            <button className="mr-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff]">
              edit
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
