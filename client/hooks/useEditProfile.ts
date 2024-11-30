import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { User } from '../../models/user.ts'
import request from 'superagent'
import { useState } from 'react'

// Fetch user data
// export async function getUser(auth0_id: string, token: string) {
//   const res = await request
//     .get(`/api/v1/user/${auth0_id}`)
//     .set('Authorization', `Bearer ${token}`);
//   return res.body;
// }

// Upsert (create or update) user profile
export async function upsertUser(profileData: User, token: string) {
  console.log('Sending profile data to backend:', profileData)
  const res = await request
    .post('/api/v1/user')
    .set('Authorization', `Bearer ${token}`)
    .send(profileData)

  console.log('Response from server:', res.body)
  return res.body
}

export function useUpsertProfile() {
  const { user, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  const [profileUpdated, setProfileUpdated] = useState(false)

  const mutation = useMutation({
    mutationFn: async (profileData: User) => {
      if (profileUpdated) {
        console.log('Profile is already updated. Skipping further requests.')
        return
      }

      if (!user || !user.sub) {
        throw new Error("User is not authenticated or missing 'sub' property.")
      }

      const accessToken = await getAccessTokenSilently()

      try {
        const response = await upsertUser(profileData, accessToken)
        return response
      } catch (error) {
        console.error('Error during upsertUser:', error)
        throw error
      }
    },
    onSuccess: (data) => {
      console.log('User profile upserted successfully:', data)
      setProfileUpdated(true)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Error during mutation:', error)
    },
  })

  const handleProfileUpsert = (profileData: User) => {
    if (!profileUpdated) {
      mutation.mutate(profileData)
    }
  }

  return { mutation, handleProfileUpsert }
}