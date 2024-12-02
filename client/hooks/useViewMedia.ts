import * as api from '../apis/api.ts'
import { useAuth0 } from "@auth0/auth0-react"
import { useQuery } from "@tanstack/react-query"


export function useViewMyMedia(capsule_id: number) {
  const { user, getAccessTokenSilently } = useAuth0()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['viewMedia', capsule_id],
    queryFn: async () => {
      const token = await getAccessTokenSilently()
      if (user && user.sub) {
        const response = await api.getCapsuleById(token, capsule_id)
        return response
      }
    },
  })

  return { data, isLoading, isError }
}
