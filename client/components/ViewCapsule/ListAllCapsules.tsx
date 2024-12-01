// import { useViewCapsules } from '../../hooks/useViewCapsule'
import CapsuleListItem from './CapsuleListItem'
import { CapsuleData } from '../../../models/capsule'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../Authentication/Authenticated'
import { Link } from 'react-router-dom'

// import { useViewCapsules } from '../../hooks/useViewCapsule'
// import { Loading } from '../Loading/Loading'

function ListAllCapsules() {
  // TODO: When add new capsule is completed, can use that data

  // const { data, isError, isLoading } = useViewCapsules()

  // if (isLoading) {
  //   return <Loading />
  // }

  // if (isError) {
  //   return <p>Please try again later... </p>
  // }

  // FAKE DATA to be deleted once create a capsule is working
  const capsules: CapsuleData[] = [
    {
      title: 'Guasha Progress',
      time: '30/11/2026 14:00',
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

  return (
    <>
      <section className="bg-[#13A25B] pl-16 font-lalezar">
        <div className="flex flex-row justify-between font-lalezar ">
          <h1 className="be-cover pt-20 text-9xl font-bold tracking-wider text-white">
            CAPSULES
          </h1>
          <Link key="add-new-capsule" to={`/addcapsule`}>
          <button className="mr-28 h-14 w-36 inline-block text-4xl font-bold rounded-full bg-[#ffffff] text-[#13A25B]">ADD +</button>
          </Link>
        </div>
        <IfAuthenticated>
          <div className="flex flex-row">
            {capsules?.length > 0 ? (
              capsules.map((capsule: CapsuleData) => {
                return (
                  <>
                    <Link key={capsule.id} to={`/dashboard/${capsule.id}`}>
                      <CapsuleListItem key={capsule.id} {...{ capsule }} />
                    </Link>
                  </>
                )
              })
            ) : (
              <p className="text-4xl tracking-wider text-white">
                Please create a capsule to continue!
              </p>
            )}
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
