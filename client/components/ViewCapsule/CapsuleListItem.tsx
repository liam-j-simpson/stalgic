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
      <div className="dashboard-capsule"></div>
    </>
  )
}

export default CapsuleListItem
