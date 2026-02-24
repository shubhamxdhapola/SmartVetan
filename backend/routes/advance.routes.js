import express from 'express'
import { addAdvance, deleteAdvance, getAdvances, getEmployeeAdvances, updateAdvance } from '../controllers/advance.controller.js'

const router = express.Router()

router.get('/', getAdvances)
router.patch('/:advanceId', updateAdvance)
router.delete('/:advanceId', deleteAdvance)

export default router