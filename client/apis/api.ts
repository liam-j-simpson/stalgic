import request from 'superagent'
import { Capsule, CapsuleArray, CapsuleData } from '../../models/capsule'
import { User } from '../../models/user'
import { Media, MediaData } from '../../models/media'

// -- GET ALL CAPSULES -- //
export async function getCapsules(token: string) {
  const res = await request
    .get('/api/v1/capsule/')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body as CapsuleArray
}

// -- GET CAPSULE BY ID -- //
export async function getCapsuleById(token: string, id: number) {
  const res = await request
    .get(`/api/v1/capsule/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body as CapsuleData
}

// -- GET USER DATA BY AUTH0-ID -- //
export async function getUser(auth0_id: string, token: string) {
  const res = await request
    .get(`/api/v1/user/${auth0_id}`)
    .set('Authorization', `Bearer ${token}`)
  return res.body
}

// -- UPSERT USER PROFILE (ADD OR UPDATE) -- //
export async function upsertUser(profileData: User, token: string) {
  const res = await request
    .post('/api/v1/user/')
    .set('Authorization', `Bearer ${token}`)
    .send(profileData)
  return res.body
}

// -- ADD CAPSULE -- //
export async function addCapsule(capsule: Capsule, token: string) {
  try {
    const res = await request
      .post('/api/v1/capsule/')
      .set('Authorization', `Bearer ${token}`)
      .send(capsule)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return res.body
  } catch (error) {
    console.error(500)
  }
}

// -- POST MEDIA TO CAPSULE -- //
export async function addMedia(file: MediaData, token: string) {
  try {
    const res = await request
      .post('/api/v1/media/')
      .set('Authorization', `Bearer ${token}`)
      .send(file)

    return res.body
  } catch (error) {
    throw new Error(`Failed to upload media: ${error}`)
  }
}

// -- GET ALL MEDIA IN A CAPSULE BY ID -- //
export async function viewMyMedia(capsule_id: number, token: string) {
  const res = await request
    .get(`/api/v1/media/${capsule_id}`)
    .set('Authorization', `Bearer ${token}`)
  return res.body
}
