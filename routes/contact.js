const { Router } = require('express')
const { registerContact  } = require('../controllers/contact')

const router = Router()

router.post('/', registerContact )


module.exports = router