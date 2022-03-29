const express = require('express')

const Hebergement = require('../models/Hebergement');
const { hebergementValidator, updateHebergementValidator } = require('../utilities/validators');


const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const resp = await Hebergement.find()
        console.log(resp);
        return res.json(resp)
    } catch (err) {
        console.log({ err })
    }
})

router.post('/', async (req, res) => {
    console.log(req.body);
    const reqBody = req.body
    const validationResult = hebergementValidator.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
        return res.json(validationResult)
    }
    try {
        const hebergement = new Hebergement(reqBody)
        const savedHebergement = await hebergement.save()
        res.status(201).json({
            message: 'Hebergement created successfully',
            hebergement: savedHebergement
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }


})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    console.log(req.body);
    const validationResult = updateHebergementValidator.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
        return res.json(validationResult)
    }
    try {
        const hebergementFindUpdate = await Hebergement.findByIdAndUpdate(id, { $set: req.body }, { new: true })
        return res.json({
            message: "Hebergement updated successfully",
            hebergementFindUpdate
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const hebergementToDelete = await Hebergement.findByIdAndDelete(id)
        if (!hebergementToDelete) {
            return res.status(404).json({ error: 'Hebergement not found' })
        }

        return res.json({
            message: "Hebergement deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const hebergementFind = await Hebergement.findById(id)
        if (!hebergementFind) {
            return res.status(404).json({ error: 'Hebergement not found' })
        }
        return res.json(hebergementFind)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
})










module.exports = router