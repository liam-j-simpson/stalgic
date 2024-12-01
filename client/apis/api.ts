import request from 'superagent'
import { CapsuleData } from '../../models/capsule'
import { User } from '../../models/user'

// -- GET ALL CAPSULES -- //
export async function getCapsules(token: string) {
  const res = await request
    .get('/api/v1/capsule/')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body as CapsuleData[]
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
    .set('Authorization', `Bearer ${token}`);
  return res.body as User
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
      .set('Content-Type', 'application/json')
      .send(capsule)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    return res.body
  } catch (error) {
    console.error(500)
  }
}
