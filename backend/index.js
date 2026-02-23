import express from 'express'
import connectDB from './config/db.js';
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/employer.auth.routes.js'
import employeeRoutes from './routes/employee.routes.js'
import uploadRoutes from './routes/upload.routes.js'
import { authenticate } from './middlewares/authenticate.js';

const app = express();
const PORT = process.env.PORT

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/employee', authenticate, employeeRoutes)
app.use('/api/upload', uploadRoutes)

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server at runnig at PORT : ${PORT}`)
})


