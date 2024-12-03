import * as api from '../apis/api.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { useQuery } from '@tanstack/react-query'

export function useViewMyMedia(capsule_id: number) {
  const { getAccessTokenSilently } = useAuth0()

  return useQuery({
    queryKey: ['viewMedia', capsule_id],
    queryFn: async () => {
      const token = await getAccessTokenSilently()

      const res = await api.viewMyMedia(capsule_id, token)
      return res
    },
  })
}
