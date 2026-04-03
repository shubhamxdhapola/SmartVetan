import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/employer.auth.routes.js'
import employeeRoutes from './routes/employee.routes.js'
import uploadRoutes from './routes/upload.routes.js'
import salaryRecordsRoutes from './routes/salary.records.routes.js'
import advanceRoutes from './routes/advance.routes.js'
import dashboardRoutes from './routes/dashboard.route.js'
import { authenticate } from './middlewares/authenticate.js';
import subscribeRoutes from './routes/subscribe.route.js';

const app = express();
const PORT = process.env.PORT

app.use(cookieParser())
app.use(express.json())

app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true
}))

app.use('/api/auth', authRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/subscribe', subscribeRoutes)
app.use('/api/employee', authenticate, employeeRoutes)
app.use('/api/advance', authenticate, advanceRoutes)
app.use('/api/salary', authenticate, salaryRecordsRoutes);
app.use('/api/dashboard', authenticate, dashboardRoutes)

app.listen(PORT, async () => {
    await connectDB()
    console.log(`Server at runnig at PORT : ${PORT}`)
})


