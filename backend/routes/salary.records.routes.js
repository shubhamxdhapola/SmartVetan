import express from 'express'
import { generateSalary } from '../controllers/salary.records.controller.js';

const router = express.Router()

router.post('/generate/:employeeId', generateSalary)


export default router;