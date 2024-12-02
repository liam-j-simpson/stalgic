import express from 'express'
import * as Path from 'node:path'
import userRoutes from '../server/routes/users.ts'
import capsuleRoutes from '../server/routes/capsules.ts'
import mediaRouter from '../server/routes/medias.ts'

const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: false }))

server.use('/api/v1/user', userRoutes)
server.use('/api/v1/capsule', capsuleRoutes)
server.use('/api/v1/media', mediaRouter)

server.use(express.static(Path.resolve('public')))

if (process.env.NODE_ENV === 'production') {
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
