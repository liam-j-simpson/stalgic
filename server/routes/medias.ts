import express from 'express'
import upload from '../upload'
import checkJwt from '../auth0'
import * as db from '../db/medias'
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
    if (!capsule || capsule.status !== 'unlocked') {
      return res.status(404).json({
        success: false,
        message: 'Capsule is already locked or does not exist',
      })
    }

    const image_url = `/uploads/images/${imageFile.filename}`

    await db.uploadMedia({ capsule_id, image_url })

    return res.status(201).json({
      success: true,
      message: 'Image successfully uploaded ',
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
