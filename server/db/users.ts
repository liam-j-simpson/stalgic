import { User } from '../../models/user'
import db from './connection'

export async function upsertProfile(user: User) {
  const { auth0_id, name, email, dob, profile_image } = user

  try {
    const existingUser = await db('users').where('auth0_id', auth0_id).first()
    if (existingUser) {
      return { success: true, message: 'User already exists' }
    }

    await db('users')
      .insert({
        auth0_id,
        name,
        email,
        dob,
        profile_image,
      })
      .onConflict('auth0_id')
      .merge()

    return { success: true, message: 'User added/updated successfully' }
  } catch (error) {
    throw new Error(
      ` ${error instanceof Error ? error.message : 'Failed to add or update user'}`,
    )
  }
}

export async function getUserByAuth0Id(auth0_id: string): Promise<User[]> {
  const result = await db('users').where('auth0_id', auth0_id).select('*')

  return result
}
