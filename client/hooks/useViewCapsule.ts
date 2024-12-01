// View all Capsules
// View one capsule
import { useQuery } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'

import * as api from '../apis/api.ts'

// -- GET ALL CAPSULES -- //

export function useViewCapsules() {
  const { user, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['capsules'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await api.getCapsules(accessToken)
        return response
      }
    },
  })

  return { data, isLoading, isError }
}


// -- GET CAPSULE BY ID -- //
export function useViewCapsuleById(id: number) {
  const {user, getAccessTokenSilently} = useAuth0()

  const {data, isLoading, isError} = useQuery({
    queryKey: ['capsule', id],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await api.getCapsuleById(accessToken, id)
        return response
      }
    }
  })

  return { data, isLoading, isError }
}