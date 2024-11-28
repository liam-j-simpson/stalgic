import { useAuth0 } from '@auth0/auth0-react'
// import { useViewCapsules } from '../../hooks/useViewCapsule'
import CapsuleListItem from './CapsuleListItem'
import { Capsule } from '../../../models/capsule'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'

interface Props {
  userId: string
}

function ListAllCapsules(props: Props) {
  const { userId } = props

  // TODO: When back-end setup is completed, use that data
  // const { data: capsules, isError, isLoading } = useViewCapsules()

  // FAKE DATA
  const capsules: Capsule[] = [
    {
      title: 'Guasha Progress',
      time: '12y 30d',
      description: 'Contour that face',
      tags: ['health', 'wellbeing'],
    },
    {
      title: '30th Birthday',
      time: '8y 2d',
      description: 'Collection of photos for my 30th',
      tags: ['birthday', 'memories'],
    },
    {
      title: 'Painting',
      time: '12m 1d',
      description: 'Photos from over the years, super cool',
      tags: ['art', 'design'],
    },
  ]

  const { user } = useAuth0()
  const myCapsules = userId === user?.sub

  // -- WHEN DATA IS RENDERED FROM DB CAN INCLUDE -- //
  // if (isLoading) {
  //   return <p>Capsules coming soon...</p>
  // }

  // if (isError) {
  //   return <p>Please try again later... </p>
  // }

  return (
    <>
      <h1>Capsules</h1>

      {capsules.map((capsule: Capsule) => {
        return (
          <>
            <CapsuleListItem key={capsule.title} {...{ capsule, myCapsules }} />
          </>
        )
      })}
    </>
  )
}

export default ListAllCapsules
