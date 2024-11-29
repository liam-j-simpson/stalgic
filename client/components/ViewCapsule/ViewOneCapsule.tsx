
function ViewOneCapsule() {
  

  // TODO: render the information from the capsule that has been clicked on (onto this page)

  return (
    <>
      <section className="bg-[#13A25B] pl-16 font-lalezar">
        <div className="flex flex-row">
          <h1 className="be-cover pt-20 font-lalezar text-9xl font-bold tracking-wider text-white">
            UPLOAD
          </h1>
        </div>

        <div className="mr-16 flex flex-row justify-between">
          <div className="h-[32rem] w-2/3 rounded-lg border-8 border-dashed border-white">
            <h1 className="justify-center text-center text-white">
              Drag and drop to upload files
            </h1>
          </div>

          <div className="w-1/3 ml-8 rounded-lg bg-[#ffffff]">
            Render information
          </div>
        </div>
      </section>
    </>
  )
}

export default ViewOneCapsule
