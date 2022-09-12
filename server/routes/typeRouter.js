const Router = require('express')
const router = new Router()
const typeController = require('../controller/typeController')
const checkRle = require('../middleware/checkRoleMiddleware')

router.post('/',checkRle("ADMIN"),typeController.create)
router.get('/',typeController.getAll)


module.exports= router