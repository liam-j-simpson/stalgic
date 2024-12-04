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
import ErrorPage from '../Error/ErrorPage'

function ListAllCapsules() {
  const { data, isError, isLoading } = useViewCapsules()

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return <ErrorPage />
  }

  if (data) {
    return (
      <>
        <section className="bg-[#13A25B] pl-16 font-lalezar">
          <div className="flex flex-row justify-between font-lalezar ">
            <h1 className="be-cover pt-20 text-9xl font-bold tracking-wider text-white">
              CAPSULES
            </h1>
          </div>
          <IfAuthenticated>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
              <Link key="add-new-capsule" to={`/addcapsule`}>
                <button className=" m-4 h-96 w-80 rounded-lg bg-[#ffffff] p-6 text-[60px] text-[#13A25B] opacity-55 transition-transform hover:scale-105 focus:outline-none">
                  &#x271A;
                </button>
              </Link>
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
