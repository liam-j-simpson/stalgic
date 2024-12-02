import request from 'superagent'
import { Capsule, CapsuleArray, CapsuleData } from '../../models/capsule'
import { User } from '../../models/user'

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
  console.log('api get user', res.body.user)

  return res.body.user[0]
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
export async function addMedia(form: FormData, token: string) {
  await request
    .post('/api/v1/media/')
    .set('Authorization', `Bearer ${token}`)
    .send(form)
}

// -- GET ALL MEDIA IN A CAPSULE BY ID -- //
export async function viewMyMedia(capsule_id: number, token: string) {
  const res = await request
    .get(`/api/v1/media/${capsule_id}`)
    .set('Authorization', `Bearer ${token}`)
  return res.body
}

// -- EDIT CAPSULE INFORMATION -- //
export async function editCapsuleInformation(
  token: string,
  capsuleData: CapsuleData,
) {
  const { title, description, tags, id, time } = capsuleData
  await request
    .put(`/api/v1/capsule/${id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({ title, description, tags, id, time })
}

// -- DELETE CAPSULE BY ID -- //
export async function deleteCapsule(token: string, id: number) {
  await request
    .delete(`/api/v1/capsule/${id}`)
    .set('Authorization', `Bearer ${token}`)
}
