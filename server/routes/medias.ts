import express from 'express'
import upload from '../upload'
import { JwtRequest } from '../auth0'
import checkJwt from '../auth0'
import * as db from '../db/medias'

const router = express.Router()

router.post(
  '/',
  checkJwt,
  upload.single('image'),
  async (req: JwtRequest, res) => {
    const { capsule_id } = req.body
    const imageFile = req.file

    if (!capsule_id || !imageFile) {
      return res.status(400).json({
        success: false,
        message: 'Please provide the required fields: capsule_id and image',
      })
    }

    const image_url = `/uploads/images/${imageFile.filename}`

    try {
      const uploadedData = await db.uploadMedia({ capsule_id, image_url })

      return res.status(201).json({
        success: true,
        message: 'Image successfully uploaded',
        uploadedData,
      })
    } catch (error) {
      console.error('Failed to upload an image', error)
      return res.status(500).json({
        success: false,
        message: 'Failed to upload an image, please try again later',
      })
    }
  },
)

export default router
