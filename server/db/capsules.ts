import { Capsule, CapsuleData } from '../../models/capsule'
import db from './connection'

export async function createCapsules(capsule: Capsule, userID: string) {
  const { title, time, description, tags } = capsule
  const tagsJson = JSON.stringify(tags)
  try {
    await db('capsules').insert({
      title,
      time,
      description,
      tags: tagsJson,
      user_id: userID,
    })

    return { success: true, message: ' has been successfully created' }
  } catch (error) {
    console.error('Cannot create a new capsules', error)

    throw new Error(
      error instanceof Error ? error.message : 'Failed to create a new Capsule',
    )
  }
}

export async function updateCapsule(capsule: CapsuleData) {
  const { title, time, description, tags, id } = capsule

  const tagsJson = JSON.stringify(tags)

  try {
    await db('capsules').where({ id }).update({
      title,
      time,
      description,
      tags: tagsJson,
    })
  } catch (error) {
    console.error("Failed to edit capsule's data", error)
  }
}
