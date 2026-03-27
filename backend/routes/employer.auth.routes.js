import express from 'express'
import {
    getEmployerInfo, googleSignin, loginEmployer, logoutEmployer, registerEmployer
} from '../controllers/employer.auth.controller.js'
import { authenticate } from '../middlewares/authenticate.js'

const router = express.Router()

router.post('/register', registerEmployer)
router.post('/login', loginEmployer)
router.post('/logout', logoutEmployer)
router.get('/get-employer-info', authenticate, getEmployerInfo)
router.post('/google-signin', googleSignin)

export default router;