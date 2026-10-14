import express from 'express'


import upload from '../config/upload.js'
import UploadController from '../controllers/upload.controller.js'
import UserController from '../controllers/user.controller.js'
import WelcomeController from '../controllers/welcome.controller.js'
import * as KursusController from '../controllers/kursus.controller.js'


const router = express.Router()

router.get('/welcome', WelcomeController.welcome)
router.post('/users', UserController.store)
router.post('/upload', upload.single('file'), UploadController.store)


router.get('/kursus', KursusController.index)
router.get('/kursus/:id', KursusController.show)
router.post('/kursus', KursusController.store)
router.put('/kursus/:id', KursusController.update)
router.patch('/kursus/:id', KursusController.update)
router.delete('/kursus/:id', KursusController.destroy)

export default router
