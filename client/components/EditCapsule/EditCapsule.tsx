import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../../apis/api.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { CapsuleData } from '../../../models/capsule.ts'

function EditCapsule(id: number) {
  const queryClient = useQueryClient()
  const { user, getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async (capsuleData: CapsuleData) => {
      if (!user || !user.sub) {
        throw new Error("User is not authenticated or missing 'sub' property.")
      }
      const accessToken = await getAccessTokenSilently()
      await api.editCapsuleInformation(accessToken, capsuleData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['capsule', id] })
    },
    onError: (error) => {
      console.error('Error during mutation:', error)
    },
  })
}

export default EditCapsule
