import { useMutation, useQueryClient } from '@tanstack/react-query'
import * as api from '../apis/api.ts'
import { MediaData } from '../../models/media.ts'
import { useAuth0 } from '@auth0/auth0-react'

export function useAddMedia() {
  const client = useQueryClient()

  const { user, getAccessTokenSilently } = useAuth0()

  return useMutation({
    mutationFn: async ({ media }: { media: MediaData }) => {
      if (!user || !user.sub) {
        throw new Error("User is not authenticated or missing 'sub' property.")
      }

      const token = await getAccessTokenSilently()

      const formData = new FormData()
      formData.append('image_url', media.image_url)

      await api.addMedia(media, token)
    },

    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['media'] })
    },
    onError: (error) => {
      console.error('Error during mutation:', error)
    },
  })
}
