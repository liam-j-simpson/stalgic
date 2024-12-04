import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth0 } from '@auth0/auth0-react'
import { EditUser, User } from '../../models/user.ts'
import { useState } from 'react'
import * as api from '../apis/api.ts'

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
        const response = await api.upsertUser(profileData, accessToken)
        return response
      } catch (error) {
        console.error('Error during upsertUser:', error)
        throw error
      }
    },
    onSuccess: () => {
      console.log('User profile upserted successfully:')
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

export function useEditProfile() {
  const { user, getAccessTokenSilently } = useAuth0()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (updatedProfile: EditUser) => {
      const accessToken = await getAccessTokenSilently()
      if (!user?.sub) {
        throw new Error('User not authenticated')
      }
      console.log('mutation', updatedProfile)
      await api.editUser(updatedProfile, accessToken)
    },
    onError: () => {
      console.log('this is an error')
    },
    onSuccess: () => {
      console.log('success')

      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
    },
  })
}
