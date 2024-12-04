import db from './connection'
import { MediaDataDraft } from '../../models/media'

export async function uploadMedia(media: MediaDataDraft) {
  const { capsule_id, filename } = media

  try {
    await db('medias').insert({
      capsule_id,
      filename,
    })
  } catch (error) {
    console.error('Failed to upload image', error)

    throw new Error('Failed to upload media')
  }
}

export async function getCapsuleMedia(capsule_id: number) {
  try {
    const media = await db('medias').where('capsule_id', capsule_id).select('*')
    return media
  } catch (error) {
    console.error('Error fetching media:', error)
    throw error
  }
}
