import { useEffect, useState } from 'react'

function TimeFunction(timeString: string | undefined) {
  const [timeRemaining, setTimeRemaining] = useState<{
    years: number
    days: number
    hours: number
    minutes: number
    seconds: number
  } | null>(null)

  const parseTime = (time: string): Date => {
    const [day, month, yearAndTime] = time.split('/')
    const [year, timePart] = yearAndTime.split(' ')
    const dateString = `${year}-${month}-${day}T${timePart}:00`
    return new Date(dateString)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const openingTime = parseTime(timeString ?? '')
      const timeDiff = openingTime.getTime() - now.getTime()

      if (timeDiff <= 0) {
        setTimeRemaining(null)
        clearInterval(interval)
      } else {
        const totalSeconds = Math.floor(timeDiff / 1000)
        const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365))
        const days = Math.floor(
          (totalSeconds % (60 * 60 * 24 * 365)) / (60 * 60 * 24),
        )
        const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))
        const minutes = Math.floor((totalSeconds % (60 * 60)) / 60)
        const seconds = totalSeconds % 60

        setTimeRemaining({ years, days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [timeString])
  return (
    <>
      {timeRemaining ? (
        <div className="flex flex-col space-y-1">
          <div className="text-[36px]">
            {timeRemaining.years > 0 && <span>{timeRemaining.years}y </span>}
            {timeRemaining.days > 0 && <span>{timeRemaining.days}d </span>}
            <div className="-mt-4 text-[22px]">
              {timeRemaining.hours > 0 && <span>{timeRemaining.hours}h </span>}
              {timeRemaining.minutes > 0 && (
                <span>{timeRemaining.minutes}m </span>
              )}
              <span>{timeRemaining.seconds}s</span>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-[24px] text-[#FE5801]">Opened!</p>
      )}
    </>
  )
}

export default TimeFunction
