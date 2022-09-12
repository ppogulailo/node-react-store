const Router = require('express')
const router = new Router()
const userController = require('../controller/userController')
const  authMiddlware = require('../middleware/authMiddlware')
router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddlware,userController.check)

module.exports= router