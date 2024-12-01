import db from './connection'
import { MediaData } from '../../models/media'

export async function uploadMedia(media: MediaData) {
  const { capsule_id, image_url } = media

  try {
    const result = await db('medias').insert({
      capsule_id,
      image_url,
    })

    return result
  } catch (error) {
    console.error('Failed to upload image', error)

    throw new Error('Failed to upload media')
  }
}

export async function getCapsuleMedia(capsule_id: number) {
  try {
    console.log('Fetching all media for capsule:', capsule_id)

    const media = await db('medias').where('capsule_id', capsule_id).select('*')
    return media
  } catch (error) {
    console.error('Error fetching media:', error)
    throw error
  }
}
