import cron from 'node-cron'

import { startCron } from './taskSchedular.ts'

cron.schedule('* * * * *', async () => {
  startCron()
})
