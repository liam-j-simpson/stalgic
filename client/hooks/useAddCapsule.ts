import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Capsule } from '../../models/capsule'
import * as api from '../apis/api'

export function useAddCapsule() {
  const queryClient = useQueryClient()
  const { user, getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (capsule: Capsule) => {
      const accessToken = await getAccessTokenSilently()
      if (!user?.sub) {
        throw new Error('User not authenticated')
      }
      await api.addCapsule(capsule, accessToken)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['capsules'],
      })
    },
  })
}
