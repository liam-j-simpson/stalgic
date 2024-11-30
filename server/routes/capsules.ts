import express from 'express'
import * as db from '../db/capsules'
import checkJwt from '../auth0'
import { JwtRequest } from '../auth0'
import moment from 'moment'

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

    return res.status(201).json({
      success: true,
      message: 'The capsule was successfully created.',
      newCapsule,
    })
  } catch (error) {
    console.error('Error in creating new capsule', error)
    return res.status(500).json({
      success: false,
      message: 'The new capsule could not be created. Please try again later.',
    })
  }
})

// Get request to list all capsules of the user
router.get('/', checkJwt, async (req: JwtRequest, res) => {
  const user_id = req.auth?.sub

  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, message: 'Please provide a valid user id' })
  }
  try {
    const results = await db.getUserCapsule(user_id)
    return res.status(200).json({
      success: true,
      message: "The user's capsule list was successfully retrieved.",
      results,
    })
  } catch (error) {
    console.error("Unable to fetch user's capsule list ")
    return res.status(500).json({
      success: false,
      message:
        "Unable to retrieve the user's capsule list. Please try again later.",
    })
  }
})

// Put request to edit capsule
router.put('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({
      success: false,
      message:
        'Invalid capsule ID provided. Please check the ID and try again.',
    })
  }
  const { title, time, description, tags, status } = req.body

  if (!time || !time || !description || !tags) {
    return res
      .status(404)
      .json({ success: false, message: 'Missing required fields' })
  }

  const updatedCapsuleData = { title, time, description, tags, status, id }

  try {
    const updatedCapsule = await db.updateCapsule(updatedCapsuleData)

    if (!updatedCapsule || updatedCapsule[0].status === 'locked') {
      return res.status(403).json({
        success: false,
        message: 'Capsule is locked, cannot be edited',
      })
    }
    return res.status(200).json({
      success: true,
      message: 'The capsule was successfully updated.',
      updatedCapsule,
    })
  } catch (error) {
    console.error('Error in updating capsule', error)
    return res.status(500).json({
      success: false,
      message: ' The capsule could not be updated. Please try again later.',
    })
  }
})

router.get('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  if (!id) {
    return res.status(404).json({
      success: false,
      message:
        'Invalid capsule ID provided. Please check the ID and try again.',
    })
  }
  try {
    const singleCapsule = await db.getSingleCapsule(id)
    if (!singleCapsule) {
      return res.status(404).json({
        success: false,
        message: 'Capsule not found with the given ID.',
      })
    }

    const timeString = singleCapsule.time
    const unlockedTime = moment(timeString, 'DD/MM/YYYY HH:mm').toDate()
    const currentTime = new Date()

    const isUnlocked =
      currentTime >= unlockedTime || singleCapsule.status === 'unlocked'

    if (isUnlocked) {
      if (currentTime >= unlockedTime && singleCapsule.status !== 'unlocked') {
        await db.updateStatus(id)
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully fetched the capsule data.',
        singleCapsule,
      })
    } else {
      return res.status(403).json({
        success: false,
        message: `Capsule is locked.`,
      })
    }
  } catch (error) {
    console.error('Failed to retrieve capsule data. Please try again later.')
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve capsule data. Please try again later.',
    })
  }
})
// Delete request for deleting a single capsule
router.delete('/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)

  if (!id) {
    return res.status(400).json({
      success: false,
      message:
        'Invalid capsule ID provided. Please check the ID and try again.',
    })
  }

  try {
    const result = await db.deleteCapsule(id)

    if (!result.success) {
      return res.status(404).json({ success: false, message: result.message })
    }

    return res
      .status(200)
      .json({ success: true, message: 'The capsule was successfully deleted.' })
  } catch (error) {
    console.error(
      'The capsule could not be deleted. Please try again later.',
      error,
    )
    return res.status(500).json({
      success: false,
      message: 'The capsule could not be deleted. Please try again later.',
    })
  }
})

router.patch('/:id/lock', checkJwt, async (req, res) => {
  const id = Number(req.params.id)

  const capsule = await db.getSingleCapsule(id)
  if (!capsule || capsule.status !== 'unlocked') {
    return res.status(403).json({
      success: false,
      message: 'Capsule is already locked or does not exist',
    })
  }

  await db.lockCapsule(id)
  res.json({ success: true, message: 'Capsule successfully locked' })
})

export default router
