import { useViewMyMedia } from '../../hooks/useViewMedia'

interface Props {
  capsuleId: number
}

function ViewMedia() {
  const capsuleId = 12
  const { data, isLoading, isError } = useViewMyMedia(capsuleId)
  console.table(data)

  if (isLoading) {
    return <p>Capsules coming soon...</p>
  }

  if (isError) {
    return <p>Please try again later...</p>
  }

  if (data) {
    return (
      <>
        <button>View my media</button>

        <div className="flex w-full flex-wrap">
          <div className="m-4 flex flex-row w-1/4">
            {data.map((media) => (
              <img
                key={media.id}
                src={`/uploads/${media.filename}`}
                alt="Your pictures"
                className="p-2 flex:wrap"
              />
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default ViewMedia
