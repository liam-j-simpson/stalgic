import { useState } from 'react'
import { useViewMyMedia } from '../../hooks/useViewMedia'
import LoadingPage from '../Loading/LoadingPage'
import ErrorPage from '../Error/ErrorPage'

interface Props {
  capsuleId: number
}

function ViewMedia(props: Props) {
  const capsuleId = props.capsuleId
  const { data, isLoading, isError } = useViewMyMedia(capsuleId)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleNext = () => {
    if (data && selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % data.length)
    }
  }

  const handlePrevious = () => {
    if (data && selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + data.length) % data.length)
    }
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return <ErrorPage />
  }

  if (data) {
    return (
      <div className="font-lalezar">
        <h1 className="be-cover pl-16 pt-20 text-9xl font-bold tracking-wider text-white">
          Media
        </h1>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
          {data.map((media, index) => (
            <button
              key={media.id}
              className="relative block cursor-pointer border-none bg-transparent p-0 focus:outline-none"
              onClick={() => setSelectedIndex(index)}
              aria-label={`View media ${media.filename}`}
            >
              <img
                src={`/uploads/${media.filename}`}
                alt="Your pictures"
                className="h-96 w-full object-cover transition-transform hover:scale-105"
              />
            </button>
          ))}
        </div>

        {selectedIndex !== null && (
          <>
            <button
              className="fixed inset-0 z-50 cursor-pointer bg-black bg-opacity-75"
              onClick={() => setSelectedIndex(null)}
              aria-label="Closer image"
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <button
                className="absolute left-4 ml-8 rounded-full bg-black bg-opacity-50 p-2 text-3xl font-bold text-white focus:outline-none"
                onClick={handlePrevious}
                aria-label="Previous image"
              >
                &#x2770;
              </button>
              <div className="relative bg-transparent">
                <button
                  className="absolute right-2 top-2 text-2xl font-bold text-white focus:outline-none"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close image"
                >
                  &times;
                </button>
                <img
                  src={`/uploads/${data[selectedIndex].filename}`}
                  alt="Enlarged view"
                  className="max-h-screen max-w-full"
                />
              </div>
              <button
                className="absolute right-4 mr-8 rounded-full bg-black bg-opacity-50 p-2 text-3xl font-bold text-white focus:outline-none"
                onClick={handleNext}
                aria-label="Next image"
              >
                &#x2771;
              </button>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default ViewMedia
