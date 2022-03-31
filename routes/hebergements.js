const express = require('express')
const { getAllHebergements, createHebergement, updateHebergement, deleteHebergement, getSingleHebergement } = require('../controllers/hebergements')



const router = express.Router()


router.get('/', getAllHebergements)
router.post('/', createHebergement)
router.put('/:id', updateHebergement)
router.delete('/:id', deleteHebergement)
router.get('/:id', getSingleHebergement)



module.exports = router