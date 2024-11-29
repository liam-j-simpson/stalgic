import { useAuth0 } from '@auth0/auth0-react'
// import { useViewCapsules } from '../../hooks/useViewCapsule'
import CapsuleListItem from './CapsuleListItem'
import { CapsuleData } from '../../../models/capsule'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../Authentication/Authenticated'
import { Link} from 'react-router-dom'

interface Props {
  userId: string
}

function ListAllCapsules(props: Props) {
  const { userId } = props

  // TODO: When back-end setup is completed, use that data
  // const { data: capsules, isError, isLoading } = useViewCapsules()

  // FAKE DATA
  const capsules: CapsuleData[] = [
    {
      title: 'Guasha Progress',
      time: '22/12/2030 14:00',
      description: 'Contour that face',
      tags: ['health', 'wellbeing'],
      id: 1,
    },
    {
      title: '30th Birthday',
      time: '18/06/2050 17:00',
      description: 'Collection of photos for my 30th',
      tags: ['birthday', 'memories'],
      id: 2,
    },
    {
      title: 'Painting',
      time: '01/08/2025 09:00',
      description: 'Photos from over the years, super cool',
      tags: ['art', 'design'],
      id: 3,
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
      <section className="bg-[#13A25B] pl-16 font-lalezar">
        <div className="flex flex-row">
          <h1 className="be-cover pt-20 font-lalezar text-9xl font-bold tracking-wider text-white">
            CAPSULES
          </h1>
        </div>
        <IfAuthenticated>
          <div className="flex flex-row">
            {capsules.map((capsule: CapsuleData) => {
              return (
                <>
                  <Link key={capsule.id} to={`/dashboard/${capsule.id}`}>
                    <CapsuleListItem
                      key={capsule.id}
                      {...{ capsule, myCapsules }}
                    />
                  </Link>
                </>
              )
            })}
          </div>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <p className="text-[24px] text-white">
            Please sign in to view your capsules!
          </p>
        </IfNotAuthenticated>
      </section>
    </>
  )
}

export default ListAllCapsules
