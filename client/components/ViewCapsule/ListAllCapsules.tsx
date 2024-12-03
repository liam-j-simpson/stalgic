import CapsuleListItem from './CapsuleListItem'
import { CapsuleData } from '../../../models/capsule'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from 'react'
import {
  IfAuthenticated,
  IfNotAuthenticated,
} from '../Authentication/Authenticated'
import { Link } from 'react-router-dom'
import { useViewCapsules } from '../../hooks/useViewCapsule'
import LoadingPage from '../Loading/LoadingPage'

function ListAllCapsules() {
  const { data, isError, isLoading } = useViewCapsules()

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return <p>Please try again later... </p>
  }

  if (data) {
    return (
      <>
        <section className="bg-[#13A25B] pl-16 font-lalezar">
          <div className="flex flex-row justify-between font-lalezar ">
            <h1 className="be-cover pt-20 text-9xl font-bold tracking-wider text-white">
              CAPSULES
            </h1>
            <Link key="add-new-capsule" to={`/addcapsule`}>
              <button className="mr-28 inline-block h-14 w-36 rounded-full bg-[#ffffff] text-4xl font-bold text-[#13A25B] hover:bg-[#FE5801] hover:text-[#ffffff]">
                ADD +
              </button>
            </Link>
          </div>
          <IfAuthenticated>
            <div className="flex flex-row">
              {data && data.results.length > 0 ? (
                data.results.map((capsule: CapsuleData) => {
                  return (
                    <Link
                      key={`capsule${capsule.id}`}
                      to={`/dashboard/${capsule.id}`}
                    >
                      <CapsuleListItem {...{ capsule }} />
                    </Link>
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
}

export default ListAllCapsules
