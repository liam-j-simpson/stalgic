import { Capsule, CapsuleData } from '../../models/capsule'
import db from './connection'

export async function getUserCapsule(user_id: string) {
  try {
    const singleCapsule = await db('capsules')
      .where({ user_id })
      .select('title', 'time', 'description', 'tags', 'status', 'id')
    const updatedResult = singleCapsule.map((capsule) => {
      return {
        ...capsule,
        tags: JSON.parse(capsule.tags),
      }
    })
    return updatedResult as CapsuleData[]
  } catch (error) {
    console.error("Failed to fetch user's capsules")
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Failed to list  all capsules of the user',
    )
  }
}

export async function getSingleCapsule(id: number) {
  try {
    console.log(`Fetching capsule with id: ${id}`)
    const singleCapsule = await db('capsules')
      .where({ id })
      .select('title', 'time', 'description', 'tags', 'status', 'id')
      .first()

    if (!singleCapsule) {
      console.log(`No capsule found with id: ${id}`)
      return { success: false, message: 'Capsule not found' }
    }

    singleCapsule.tags = JSON.parse(singleCapsule.tags)
    return singleCapsule
  } catch (error) {
    console.error('Failed to retrieve capsule data.', error)
    return { success: false, message: 'Failed to retrieve capsule data' }
  }
}

export async function createCapsules(capsule: Capsule, userID: string) {
  const { title, time, description, tags, status } = capsule

  const tagsJson = JSON.stringify(tags)
  try {
    await db('capsules').insert({
      title,
      time,
      description,
      tags: tagsJson,
      status,
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
  const { title, time, description, tags, status, id } = capsule

  const tagsJson = JSON.stringify(tags)

  try {
    const result = await db('capsules')
      .where({ id })
      .update({
        title,
        time,
        description,
        tags: tagsJson,
        status,
      })
      .returning('*')

    return result
  } catch (error) {
    console.error("Failed to edit capsule's data", error)
  }
}

export async function deleteCapsule(id: number) {
  try {
    const rowsDeleted = await db('capsules').where({ id }).del()

    if (rowsDeleted === 0) {
      return { success: false, message: 'Capsule not found' }
    }

    return { success: true }
  } catch (error) {
    console.error('Failed to delete a capsule', error)
    throw new Error('Failed to delete the capsule')
  }
}

export async function updateStatus(capsule_id: number) {
  if (!capsule_id) {
    return { success: false, message: 'Please provide valid capsule id' }
  }
  try {
    return await db('capsules')
      .where({ capsule_id })
      .update({ status: 'unlocked' })
  } catch (error) {
    console.error('Failed to update status', error)
  }
}

export async function lockCapsule(id: number) {
  try {
    return await db('capsules').where({ id }).update({ status: 'locked' })
  } catch (error) {
    console.error('Failed to lock capsule', error)
  }
}
