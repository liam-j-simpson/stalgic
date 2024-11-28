import express from 'express'
import * as db from '../db/users'
import checkJwt from '../auth0'
import { User } from '../../models/user'
import { JwtRequest } from '../auth0'

const router = express.Router()

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  const { name, email, dob, profile_image } = req.body

  if (!name || !email || !dob || !profile_image) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' })
  }

  const auth0_id = req.auth?.sub

  if (!auth0_id) {
    return res.status(400).json({ success: false, message: 'Missing Auth0 ID' })
  }

  try {
    const user: User = {
      auth0_id,
      name,
      email,
      dob,
      profile_image,
    }

    const result = await db.upsertProfile(user)

    return res.status(200).json(result)
  } catch (error) {
    console.error('Error adding/updating user profile:', error)
    return res
      .status(500)
      .json({ success: false, message: 'Failed to add or update user profile' })
  }
})

export default router
