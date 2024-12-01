// General API folder
// Will have individual hooks for each route
// Import all of our hooks into here

import request from 'superagent'
import { Capsule } from '../../models/capsule'

// -- GET ALL CAPSULES -- //
export async function getCapsules(token: string) {
  const res = await request
    .get('/api/v1/capsule/')
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json')

  return res.body as Capsule[]
}

// -- GET CAPSULE BY ID -- //

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
