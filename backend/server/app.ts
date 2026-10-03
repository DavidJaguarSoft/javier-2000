import express from 'express'
import authRoutes from './routes/auth_route'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(authRoutes)

export default app