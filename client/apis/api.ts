// General API folder
// Will have individual hooks for each route
// Import all of our hooks into here

import request from 'superagent'
import { CapsuleData } from '../../models/capsule'

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