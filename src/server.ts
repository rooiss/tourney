// import 'reflect-metadata'
import express from 'express'
import { setupDB } from './setup-db'
import validateRouter from './routes/validateRouter'
import userRouter from './routes/userRouter'
import followsRouter from './routes/followsRouter'
import tournamentRouter from './routes/tournamentRouter'
import verificationRouter from './routes/verificationRouter'
import teamRouter from './routes/teamRouter'

const redis = require('redis')
const session = require('express-session')

let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient({ host: 'redis' })
redisClient.on('connect', () =>
  console.log('Redis connection intialized======='),
)

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

setupDB()

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
app.use('/api/team', teamRouter)

app.listen(5000, () => {
  console.log('server listening on port 5000')
})
