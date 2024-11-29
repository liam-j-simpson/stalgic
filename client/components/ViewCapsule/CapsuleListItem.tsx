// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react'

import { Capsule } from '../../../models/capsule'
import TimeFunction from '../Time/TimeFunction'
interface Props {
  capsule: Capsule
}

function CapsuleListItem(props: Props) {
  // TODO: add tracker for how many items are in a capsule

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
        className={`mb-96 mr-12 flex h-96 w-80 flex-col rounded-lg bg-[#ffffff] tracking-wider p-6 text-[#13A25B] ${hover.divBg} ${hover.divText}`}
      >
        <div className="">
          {time}
          <div className="pb-4">
            <h2 className="pb-2 pt-4">{capsule.title}</h2>
            <p>{capsule.description}</p>
          </div>
          <ul>
            {capsule.tags.map((item, idx) => (
              <li
                key={idx}
                className={`mr-2 inline-block rounded-full px-4 py-2 pt-2 ${hover.tagBg} ${hover.tagText}`}
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
