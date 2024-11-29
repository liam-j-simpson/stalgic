import express from 'express'
import * as db from '../db/capsules'
import checkJwt from '../auth0'
import { Capsule } from '../../models/capsule'
import { JwtRequest } from '../auth0'

const router = express.Router()

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const { title, time, description, tags } = req.body
  const user_id = req.auth?.sub

  console.log('ID', user_id)

  if (!time || !title || !description || !tags) {
    return res
      .status(400)
      .json({ sucess: false, message: 'Missing required fields' })
  }
  if (!user_id) {
    return res.status(400).json({ success: false, message: 'Missing Auth0 ID' })
  }
  try {
    const newCapsule = await db.createCapsules({
      title,
      time,
      description,
      tags,
      user_id,
    })

    return res.status(201).json(newCapsule)
  } catch (error) {
    console.error('Error in creating new capsule', error)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to create a new Capsule' })
  }
})

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const user_id = req.auth?.sub
  if (!user_id) {
    return res
      .status(404)
      .json({ success: false, message: 'Provide the valid user id' })
  }
  try {
    const results = await db.getUserCapsule(user_id)
    console.log('RRRRRRRRRReeeeee', results)
    return res.status(200).json({
      success: true,
      message: "Successfully fetched the user's capsule list.",
      results,
    })
  } catch (error) {
    console.error("Unable to fetch user's capsule list ")
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch user's capsule list" })
  }
})

export default router
