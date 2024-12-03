import { useNavigate } from 'react-router-dom'

function ErrorPage() {
  const navigate = useNavigate()

  const handleGoHome = () => {
    navigate('/dashboard')
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#13A25B] text-white">
      <div className="mb-4 h-16 w-32 animate-bounce rounded-full bg-white"></div>{' '}
      <h1 className="mb-4 text-3xl font-semibold">
        Oops! Something went wrong...
      </h1>
      <p className="mb-6 text-lg">
        We could not find the page you were looking for.
      </p>
      <button
        onClick={handleGoHome}
        className="rounded-full bg-white px-6 py-2 text-[#13A25B] shadow-md transition-all hover:bg-gray-200"
      >
        Go Back Home
      </button>
    </div>
  )
}

export default ErrorPage
