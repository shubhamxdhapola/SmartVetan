import express from 'express'
import { addEmployee, deleteEmployee, getEmployee, getEmployees, searchEmployee, updateEmployee } from '../controllers/employee.controller.js';
import { addAdvance, getEmployeeAdvances } from '../controllers/advance.controller.js';

const router = express.Router()

router.get('/', getEmployees)
router.post('/', addEmployee)
router.get('/search', searchEmployee)
router.get('/:employeeId', getEmployee)
router.patch('/:employeeId', updateEmployee)
router.delete('/:employeeId', deleteEmployee)

router.post('/:employeeId/advance', addAdvance)
router.get('/:employeeId/advance', getEmployeeAdvances)

export default router;