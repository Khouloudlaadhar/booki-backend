const express = require('express')
const { getAllActivities, createActivities, updateActivities, deleteActivities, getSingleActivities } = require('../controllers/activities')



const router = express.Router()


router.get('/', getAllActivities)
router.post('/', createActivities)
router.put('/:id', updateActivities)
router.delete('/:id', deleteActivities)
router.get('/:id', getSingleActivities)



module.exports = router