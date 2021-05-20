import express from 'express'
import { setupDB } from './setup-db'
import validateRouter from './routes/validateRouter'
import userRouter from './routes/userRouter'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/validate', validateRouter)
app.use('/api/users', userRouter)
setupDB()

app.listen(5000, () => {
  console.log('server listening on port 5000')
})
