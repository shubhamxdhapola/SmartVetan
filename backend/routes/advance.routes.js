import express from 'express'
import {
    getAdvances,
    getAdvanceStats,
    deleteAdvance,
    updateAdvance
} from '../controllers/advance.controller.js'

const router = express.Router()

// /stats must come before /:advanceId to avoid conflict
router.get('/stats', getAdvanceStats)
router.get('/', getAdvances)
router.patch('/:advanceId', updateAdvance)
router.delete('/:advanceId', deleteAdvance)

export default router