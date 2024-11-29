import express from 'express'
import * as db from '../db/capsules'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'
import { Rss } from 'lucide-react'
import { AsyncLocalStorage } from 'async_hooks'

const router = express.Router()

// Post request to create new capsule
router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const newCpsule = req.body
  const user_id = req.auth?.sub

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

// Get request to list all capsules of the user
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const user_id = req.auth?.sub
  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, message: 'Provide the valid user id' })
  }
  try {
    const results = await db.getUserCapsule(user_id)
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

// Put request to edit capsule
router.put('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res
      .status(400)
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

// Delete request for deleting a single capsule
router.get('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  if (!id) {
    return res
      .status(404)
      .json({ success: false, message: 'Please provide valid capsule id' })
  }
  try {
    const singleCapsule = await db.getSingleCpasule(id)
    return res.status(200).json({
      success: true,
      message: 'Sucessfully fetched single capsule data',
      singleCapsule,
    })
  } catch (error) {
    console.error('Faild to fetch single capsule data')
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch single capsule data',
    })
  }
})

router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a valid capsule id' })
  }

  try {
    console.log(`Received request to delete capsule with id: ${id}`)

    const result = await db.deleteCapsule(id)

    console.log('Delete capsule result:', result)

    if (!result.success) {
      return res.status(404).json({ success: false, message: result.message })
    }

    return res
      .status(200)
      .json({ success: true, message: 'Capsule successfully deleted' })
  } catch (error) {
    console.error('Failed to delete the capsule', error)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to delete the capsule' })
  }
})

export default router
