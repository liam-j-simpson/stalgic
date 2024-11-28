import { Capsule } from '../../models/capsule'
import db from './connection'

export async function createCapsules(capsule: Capsule) {
  const { title, time, description, tags, user_id } = capsule
  const tagsJson = JSON.stringify(tags)
  try {
    await db('capsules').insert({
      title,
      time,
      description,
      tags: tagsJson,
      user_id,
    })

    return { success: true, message: 'Capsuly has been successfully created' }
  } catch (error) {
    console.error('Cannot create a new capsules', error)

    throw new Error(
      error instanceof Error ? error.message : 'Failed to create a new Capsule',
    )
  }
}
