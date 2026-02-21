import express from 'express'
import connectDB from './config/db.js';
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'

const app = express();
const PORT = process.env.PORT

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use('/api/auth/', authRoutes)

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server at runnig at PORT : ${PORT}`)
})


