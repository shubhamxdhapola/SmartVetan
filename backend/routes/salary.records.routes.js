import express from 'express'
import { generateSalary, getEmployeeSalaryHistory, markSalaryAsPaid } from '../controllers/salary.record.controller.js';

const router = express.Router()

router.post('/generate/:employeeId', generateSalary)
router.patch('/:salaryId/pay', markSalaryAsPaid)
router.get('/employee/:employeeId', getEmployeeSalaryHistory)


export default router;