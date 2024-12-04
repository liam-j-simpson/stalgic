import { useQuery } from '@tanstack/react-query'
import * as api from '../apis/api.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useViewProfile() {
  const { user, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const accessToken = await getAccessTokenSilently()
      if (user && user.sub) {
        return await api.getUser(user.sub, accessToken)
      }
    },
  })
  return { data, isLoading, isError }
}
