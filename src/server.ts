// import 'reflect-metadata'
import express from 'express'
import { setupDB } from './setup-db'
import validateRouter from './routes/validateRouter'
import userRouter from './routes/userRouter'
import followsRouter from './routes/followsRouter'
import tournamentRouter from './routes/tournamentRouter'
import verificationRouter from './routes/verificationRouter'
import teamRouter from './routes/teamRouter'
import uiRouter from './routes/uiRouter'
import divisionsRouter from './routes/divisionsRouter'
import { staticMiddleware } from './middleware/staticMiddleware'

const redis = require('redis')
const session = require('express-session')

async function main() {
  let RedisStore = require('connect-redis')(session)
  let redisClient = redis.createClient({ host: 'redis' })
  redisClient.on('connect', () =>
    console.log('Redis connection intialized======='),
  )
  await setupDB()

  const app = express()
  app.use(express.urlencoded({ extended: false }))
  app.use(express.json())

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: 'keyboard cat',
      resave: false,
    }),
  )

  app.use('/api/validate', validateRouter)
  app.use('/api/users', userRouter)
  app.use('/api/follows', followsRouter)
  app.use('/api/tournaments', tournamentRouter)
  app.use('/api/verify', verificationRouter)
  app.use('/api/tournaments/:tournamentId', teamRouter)
  app.use('/api/uiconfig', uiRouter)
  app.use('/api/divisions', divisionsRouter)

  // Static routes (for serving built UI)
  // app.use(staticMiddleware({}))

  app.listen(5001, () => {
    console.log('server listening on port 5001')
  })
}
main().catch((e) => {
  console.error(`App failed with error: ${e}`, e)
})
