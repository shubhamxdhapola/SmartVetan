import express from 'express'
import multer from 'multer'
import SmartVetanStorage from '../config/cloudinary.js'
import { uploadImage } from '../controllers/upload.controller.js'

const router = express.Router()
const upload = multer({storage : SmartVetanStorage})

router.post('/', upload.single('image'), uploadImage)

export default router