export function ProfilePage() {
  //some code

  return (
    <>
      <section className="flex">
        <div className="m-16">
          <h1 className="font-lalezar text-9xl text-white">PROFILE</h1>
        </div>
      </section>
      <div
        className={`m-16 mb-96  h-80 w-80 rounded-full bg-[#ffffff] p-6 text-[#13A25B]`}
      >
        <div className="relative left-4 top-14">
          <button className="space-l absolute inset-0 m-5 rounded-full bg-[#13A25B] p-10 text-[#ffffff]">
            <p className="absolute inset-5 font-labrada text-xl">Username</p>
          </button>
        </div>
      </div>
      <section>
        <div className="m-16 flex">
          <div
            className={`mb-96 mr-12 h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
          >
            <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">NAME</h2>
            <p className="space-l font-labrada text-xl">Username</p>
            <button className="mr-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff]">
              edit
            </button>
          </div>
          <div
            className={`mb-96 mr-12  h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
          >
            <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">
              EMAIL
            </h2>
            <p className="space-l font-labrada text-xl">user@email.com</p>
            <button className="mr-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff]">
              edit
            </button>
          </div>
          <div
            className={`mb-96 mr-12  h-64 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B]`}
          >
            <h2 className="mb-12 font-lalezar text-7xl text-[#13A25B]">DOB</h2>
            <p className="space-l font-labrada text-xl">11/11/11</p>
            <button className="mr-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 pt-2 text-[#ffffff]">
              edit
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
