const express = require('express')
const { passwordReset,passwordResetById,sendNewPassword} = require('../controllers/passwordReset')


const router = express.Router()


router.post('/',passwordReset)
router.get('/:id/:token',passwordResetById)
router.post('/:id/:token',sendNewPassword)



module.exports = router