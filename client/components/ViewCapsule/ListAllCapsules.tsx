// Link to hook
// Smart/Dumb Component
// Reference rcmndr for layout tips
import { useAuth0 } from '@auth0/auth0-react'
import { useViewCapsules } from '../../hooks/useViewCapsule'
import CapsuleListItem from './CapsuleListItem'
import { Capsule } from '../../../models/capsule'
import React from 'react'

interface Props {
  userId: string
}

function ListAllCapsules(props: Props) {
  const { userId } = props
  const { data: capsules, isError, isLoading } = useViewCapsules()

  const { user } = useAuth0()
  const myCapsules = userId === user?.sub

  if (isLoading) {
    return <p>Capsules coming soon...</p>
  }

  if (isError) {
    return <p>Please try again later... </p>
  }

  return (
    <>
      <h1>Capsules</h1>

      {capsules.map((capsule: Capsule) => {
        return (
          <>
            <CapsuleListItem key={capsule.id} {...{ capsule, myCapsules }} />
          </>
        )
      })}
    </>
  )
}

export default ListAllCapsules
