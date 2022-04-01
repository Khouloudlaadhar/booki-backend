const { Router } = require('express')
const {  loginUser } = require('../controllers/users')

const router = Router()

router.post('/login', loginUser)

module.exports = router