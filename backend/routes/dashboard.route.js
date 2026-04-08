import express from 'express'
import { getDashboardData, getHistoricalData } from '../controllers/dashboard.controller.js'

const router = express.Router()

router.get('/', getDashboardData)
router.get('/history', getHistoricalData)

export default router