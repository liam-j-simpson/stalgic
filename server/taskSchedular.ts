import cron from 'node-cron'
import { sendEmail } from './emailService.js'
import db from './db/connection.ts'
import moment from 'moment-timezone'

cron.schedule('* * * * *', async () => {
  console.log('Cron job is running every minute')
  try {
    const expiredCapsules = await db('capsules')
      .where(
        'time',
        '<',
        moment().tz('Pacific/Auckland').format('YYYY-MM-DD HH:mm:ss'),
      )
      .andWhere('time', '!=', null)

    if (expiredCapsules.length > 0) {
      console.log(`${expiredCapsules.length} expired capsules found.`)
      for (const capsule of expiredCapsules) {
        const media = await db('medias')
          .where('capsule_id', capsule.id)
          .select('image_url')

        const user = await db('users').where('id', capsule.user_id).first()

        if (user) {
          const userEmail = user.email
          const subject = 'Your Capsule Lock Time Expired'
          const message = `Hello ${user.name},\n\nYour capsule titled "${capsule.title}" has been unlocked and is now available to view.\n\nDescription: ${capsule.description}\nTags: ${capsule.tags}`

          await sendEmail(userEmail, subject, message, media)
          console.log(`Email sent to ${userEmail} for capsule ${capsule.title}`)
        } else {
          console.log(`User not found for capsule ${capsule.title}`)
        }
      }
    } else {
      console.log('No expired capsules found.')
    }
  } catch (error) {
    console.error('Error checking expired capsules:', error)
  }
})
