// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'

import { Capsule } from '../../../models/capsule'
import TimeFunction from '../Time/TimeFunction'
interface Props {
  capsule: Capsule
}

function CapsuleListItem(props: Props) {
  const { capsule } = props

  const [hover, setHover] = useState({
    divBg: 'bg-[#ffffff]',
    divText: 'text-[#13A25B]',
    tagBg: 'bg-[#13A25B]',
    tagText: 'text-[#ffffff]',
  })

  const handleHover = () => {
    setHover({
      divBg: 'hover:bg-[#FE5801]',
      divText: 'hover:text-[#ffffff]',
      tagBg: 'bg-[#ffffff]',
      tagText: 'text-[#FE5801]',
    })
  }

  const handleNoHover = () => {
    setHover({
      divBg: 'bg-[#ffffff]',
      divText: 'text-[#13A25B]',
      tagBg: 'bg-[#13A25B]',
      tagText: 'text-[#ffffff]',
    })
  }

  const time = TimeFunction(capsule.time)

  return (
    <>
      <div
        onMouseEnter={handleHover}
        onMouseLeave={handleNoHover}
        className={`m-4 h-96 w-80 rounded-lg bg-[#ffffff] p-6 text-[#13A25B] ${hover.divBg} ${hover.divText} relative object-cover transition-transform hover:scale-105 focus:outline-none`}
      >
        <div>
          <div>
            <h1 className="-mb-2 text-[36px]">{capsule.title}</h1>
            {time}
            <p className="font-labrada text-[22px]">{capsule.description}</p>
          </div>
          <ul className="absolute bottom-0 left-0 mb-4 ml-4">
            {capsule.tags.map((item, idx) => (
              <li
                key={idx}
                className={`m-1 inline-block rounded-full px-4 py-2 pt-2 ${hover.tagBg} ${hover.tagText}`}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default CapsuleListItem
