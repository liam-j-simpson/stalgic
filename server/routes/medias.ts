import express from 'express'
import upload from '../upload'
import checkJwt from '../auth0'
import * as db from '../db/medias'
import moment from 'moment'
import { getSingleCapsule } from '../db/capsules'

const router = express.Router()

router.post('/', checkJwt, upload.single('image'), async (req, res) => {
  const { capsule_id } = req.body
  const imageFile = req.file

  if (!capsule_id || !imageFile) {
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
        message: 'Capsule not found.',
      })
    }

    const existingMedia = await db.getCapsuleMedia(capsule_id)

    if (existingMedia) {
      return res.status(400).json({
        success: false,
        message: 'This capsule is already locked. No more media can be added.',
      })
    }

    console.log('Neeeee', capsule.time)

    const lockTime = moment(capsule.time, 'DD/MM/YYYY HH:mm')
    const currentDate = moment()

    if (currentDate.isAfter(lockTime)) {
      return res.status(400).json({
        success: false,
        message: 'The capsule has already been locked. No media can be added.',
      })
    }

    const image_url = `/uploads/images/${imageFile.filename}`

    await db.uploadMedia({ capsule_id, image_url })

    return res.status(201).json({
      success: true,
      message: 'Image successfully uploaded and capsule locked.',
    })
  } catch (error) {
    console.error('Failed to upload image', error)
    return res.status(500).json({
      success: false,
      message: 'Failed to upload image, please try again later.',
    })
  }
})

export default router
