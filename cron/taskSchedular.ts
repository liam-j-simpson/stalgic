import { sendEmail } from './emailService'
import db from '../server/db/connection.ts'
import moment from 'moment-timezone'

export async function startCron() {
  console.log('Cron job is running every minute')

  try {
    const currentTime = moment()
      .tz('Pacific/Auckland')
      .format('DD/MM/YYYY HH:mm')

    const expiredCapsules = await db('capsules')
      .where('time', '<', currentTime)
      .andWhere('time', '!=', '')

    if (expiredCapsules.length > 0) {
      console.log(`${expiredCapsules.length} expired capsules found.`)

      for (const capsule of expiredCapsules) {
        const capsuleTime = moment.tz(
          capsule.time,
          'DD/MM/YYYY HH:mm',
          'Pacific/Auckland',
        )
        console.log(
          'Capsule Time (NZT):',
          capsuleTime.format('DD/MM/YYYY HH:mm'),
        )

        const isUnlocked = moment()
          .tz('Pacific/Auckland')
          .isSameOrAfter(capsuleTime)

        if (isUnlocked) {
          const media = await db('medias')
            .where('capsule_id', capsule.id)
            .select('filename')

          const user = await db('users')
            .where('auth0_id', capsule.user_id)
            .first()

          if (user) {
            const userEmail = user.email
            const subject = 'Your Capsule Lock Time Expired'
            const message = `Hello ${user.name},\n\nYour capsule titled "${capsule.title}" has been unlocked and is now available to view.\n\nDescription: ${capsule.description}\nTags: ${capsule.tags}`

            await sendEmail(userEmail, subject, message, media)
            console.log(
              `Email sent to ${userEmail} for capsule ${capsule.title}`,
            )
          } else {
            console.log(`User not found for capsule ${capsule.title}`)
          }
        } else {
          console.log(`Capsule ${capsule.title} is still locked.`)
        }
      }
    } else {
      console.log('No expired capsules found.')
    }
  } catch (error) {
    console.error('Error checking expired capsules:', error)
  }
}
