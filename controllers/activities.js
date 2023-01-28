const activities = require('../models/Activities');
const { activitiesValidator, updateActivitiesValidator } = require('../utilities/validators');


const getAllActivities = async (req, res) => {
    try {
        const resp = await activities.find()
        console.log(resp);
        return res.json(resp)
    } catch (err) {
        console.log({ err })
    }
}

const createActivities = async (req, res) => {
    console.log(req.body);
    const validationResult = activitiesValidator.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
        return res.json(validationResult)
    }
    try {
        const activities1 = new activities(req.body)
        console.log(activities)
        const savedActivities = await activities1.save()
        res.status(201).json({
            message: 'activities created successfully',
            activities: savedActivities
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


}

const updateActivities = async (req, res) => {
    const { id } = req.params
    console.log(req.body);
    const validationResult = updateActivitiesValidator.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
        return res.json(validationResult)
    }
    try {
        const ActivitiesFindUpdate = await activities.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        return res.json({
            message: "activities updated successfully",
            ActivitiesFindUpdate
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

}

const deleteActivities = async (req, res) => {
    const { id } = req.params
    try {
        const ActivitiesToDelete = await activities.findByIdAndDelete(id)
        if (!ActivitiesToDelete) {
            return res.status(404).json({ error: 'activities not found' })
        }

        return res.json({
            message: "activities deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

const getSingleActivities = async (req, res) => {
    const { id } = req.params
    try {
        const ActivitiesFind = await activities.findById(id)
        if (!ActivitiesFind) {
            return res.status(404).json({ error: 'activities not found' })
        }
        return res.json(ActivitiesFind)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}


module.exports = {
    getAllActivities,
    createActivities,
    updateActivities,
    deleteActivities,
    getSingleActivities
}