import express from 'express'
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from '../controllers/employee.controller.js';
import { addAdvance, getEmployeeAdvances } from '../controllers/advance.controller.js';

const router = express.Router()

router.get('/', getEmployees)
router.post('/', addEmployee)
router.patch('/:employeeId', updateEmployee)
router.delete('/:employeeId', deleteEmployee)

router.post('/:employeeId/advance', addAdvance)
router.get('/:employeeId/advance', getEmployeeAdvances)

export default router;