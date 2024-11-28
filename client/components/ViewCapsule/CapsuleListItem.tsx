// Single capsule that can be mapped over
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

import { Capsule } from '../../../models/capsule'

interface Props {
  capsule: Capsule
}

function CapsuleListItem(props: Props) {
  const { capsule } = props

  return (
    <>
    
      <div className="m-8">
        <h1>{capsule.time}</h1>
        <h2>{capsule.title}</h2>
        <p>{capsule.description}</p>
        <ul>
          <li>{capsule.tags}</li>
        </ul>
      </div>
    </>
  )
}

export default CapsuleListItem
