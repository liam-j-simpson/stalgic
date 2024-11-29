import express from 'express'
import * as db from '../db/capsules'
import checkJwt from '../auth0'
import { Capsule } from '../../models/capsule'
import { JwtRequest } from '../auth0'
import { up } from '../db/migrations/20190905120752_fruit'
import { readdirSync } from 'fs'

const router = express.Router()

// Post request to create new capsule
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const newCpsule = req.body
  const user_id = req.auth?.sub

  console.log('ID', user_id)

  if (!newCpsule) {
    return res
      .status(400)
      .json({ sucess: false, message: 'Missing required fields' })
  }
  if (!user_id) {
    return res.status(400).json({ success: false, message: 'Missing Auth0 ID' })
  }
  try {
    const newCapsule = await db.createCapsules(newCpsule, user_id)

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

// Put request to edit capsule
router.put('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res
      .status(404)
      .json({ success: false, message: 'Please provide a valid capsule id' })
  }
  const { title, time, description, tags } = req.body

  if (!time || !time || !description || !tags) {
    return res
      .status(404)
      .json({ success: false, message: 'Missing required fields' })
  }

  const updatedCapsuleData = { title, time, description, tags, id }
  try {
    const updatedCapsule = await db.updateCapsule(updatedCapsuleData)
    return res.status(200).json({
      success: true,
      message: 'Capsule  successfully updated',
      updatedCapsule,
    })
  } catch (error) {
    console.error('Error in updating capsule', error)
    return res
      .status(500)
      .json({ success: false, message: ' Failed to update the capsule' })

  }
})

export default router
