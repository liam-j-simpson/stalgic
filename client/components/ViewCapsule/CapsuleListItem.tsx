// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useEffect, useState } from 'react'

import { Capsule } from '../../../models/capsule'
interface Props {
  capsule: Capsule
}

function CapsuleListItem(props: Props) {
  // TODO: add tracker for how many items are in a capsule

  // TODO: add tracker for how many items are in a capsule

  const { capsule } = props
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
      const openingTime = parseTime(capsule.time)
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
  }, [capsule.time])
  
  return (
    <>
      <div className="mb-96 mr-12 flex h-96 w-80 flex-col rounded-lg bg-[#ffffff] p-6 text-[#13A25B] hover:bg-[#FE5801] hover:text-[#ffffff]">
        <div className="font-bold ">
          {timeRemaining ? (
            <div className="">
              <div className="text-[48px]">
                {timeRemaining.years > 0 && (
                  <span>{timeRemaining.years}y </span>
                )}
                {timeRemaining.days > 0 && <span>{timeRemaining.days}d </span>}
              </div>
              <div className="text-[22px]">
                {timeRemaining.hours > 0 && (
                  <span>{timeRemaining.hours}h </span>
                )}
                {timeRemaining.minutes > 0 && (
                  <span>{timeRemaining.minutes}m </span>
                )}
                <span>{timeRemaining.seconds}s</span>
              </div>
            </div>
          ) : (
            <p className="text-[24px] text-[#FE5801]">Opened!</p>
          )}
        </div>

        <div className="pb-4">
          <h2 className="pt-4 pb-2 font-bold hover:text-[#FE5801]">{capsule.title}</h2>
          <p className="hover:text-[#FE5801]">{capsule.description}</p>
        </div>
        <ul>
          {capsule.tags.map((item, idx) => (
            <li
              key={idx}
              className="mr-2 pt-2 inline-block rounded-full bg-[#13A25B] px-4 py-2 text-[#ffffff] hover:bg-[#ffffff] hover:text-[#FE5801]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default CapsuleListItem

