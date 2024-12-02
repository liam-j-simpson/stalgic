import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../apis/api.ts'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

function DeleteCapsule() {
  const queryClient = useQueryClient()
  const { user, getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (id: number) => {
      if (!user || !user.sub) {
        throw new Error("User is not authenticated or missing 'sub' property.")
      }

      const accessToken = await getAccessTokenSilently()

      await api.deleteCapsule(accessToken, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['capsules'] })
      navigate('/dashboard')
    },
    onError: (error) => {
      console.error('Error during deletion:', error)
    },
  })
}

export default DeleteCapsule
