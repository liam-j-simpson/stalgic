import { User } from '../../models/user'
import db from './connection'

export async function upsertProfile(user: User) {
  const { auth0_id, name, email, dob, profile_image } = user

  try {
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
    console.error('Error adding user:', error)
    throw new Error(
      ` ${error instanceof Error ? error.message : 'Failed to add or update user'}`,
    )
  }
}
