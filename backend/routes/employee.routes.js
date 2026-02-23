import express from 'express'
import { addEmployee, deleteEmployee, getEmployees, updateEmployee } from '../controllers/employee.controller.js';

const router = express.Router()

router.get('/', getEmployees)
router.post('/add', addEmployee)
router.patch('/:id', updateEmployee)
router.delete('/:id', deleteEmployee)

export default router;