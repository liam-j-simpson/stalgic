import express from 'express'
import upload from '../upload'
import checkJwt from '../auth0'
import * as db from '../db/medias'
import { getSingleCapsule } from '../db/capsules'
import moment from 'moment-timezone'

const router = express.Router()

router.post('/', checkJwt, upload.single('file'), async (req, res) => {
  const { capsule_id } = req.body
  const filename = req.file?.filename

  if (!capsule_id || !filename) {
    return res.status(400).json({
      success: false,
      message: 'Please provide the required fields: capsule_id and image',
    })
  }

  try {
    const capsule = await getSingleCapsule(capsule_id)
    if (!capsule) {
      return res.status(404).json({
        success: false,
        message: 'Capsule does not exist',
      })
    }

    await db.uploadMedia({ capsule_id, filename })

    return res.status(201)
  } catch (error) {
    console.error('Failed to upload image', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image, please try again later.',
    })
  }
})

router.get('/:capsule_id', checkJwt, async (req, res) => {
  const capsule_id = Number(req.params.capsule_id)

  console.log('Requested capsule_id:', capsule_id)

  if (!capsule_id) {
    return res
      .status(400)
      .json({ success: false, message: 'Capsule ID is required' })
  }

  try {
    const capsule = await getSingleCapsule(capsule_id)
    if (!capsule) {
      return res.status(404).json({
        success: false,
        message: 'Capsule does not exist',
      })
    }

    const timeString = capsule.time

    console.log('Raw Unlocked Time String:', timeString)

    const unlockedTime = moment
      .utc(timeString, 'DD/MM/YYYY HH:mm')
      .tz('Pacific/Auckland', true)
      .toDate()

    const currentTime = moment().tz('Pacific/Auckland', true).toDate()

    const isUnlocked = true
    // const isUnlocked = currentTime >= unlockedTime

    if (isUnlocked) {
      const media = await db.getCapsuleMedia(capsule_id)

      if (!media || media.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'No media found for this capsule',
        })
      }

      return res.status(200).json(media)
    } else {
      return res.status(403).json({
        success: false,
        message:
          'The capsule is locked, and media cannot be accessed at this time.',
      })
    }
  } catch (error) {
    console.error('Error retrieving media:', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve media',
    })
  }
})

export default router
