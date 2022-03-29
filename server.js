const express = require('express');
const mongoose = require('mongoose');

const Hebergement = require('./models/Hebergement');


const { hebergementValidator, updateHebergementValidator } = require('./utilities/validators');

require('dotenv').config()

const app = express()
app.use(express.json())

let hebergements = [
    {
        _id: '5fcc1422e17929040331de0e',
        photo: 'https://image.resabooking.com/images/image_panoramique/Iberostar_Averroes_3.jpg',
        title: 'Hotel de luxe',
        description: 'hotel se slocalise en plein centre de la zone touristique',


    },
    {
        _id: '5fcc1422e17929040331de0e',
        photo: 'https://viago.ca/wp-content/uploads/2016/12/shutterstock_528579178-768x432.jpg',
        title: 'hotel royal',
        description: 'etablissement hotel de 4 etoiles',

    },
    {
        _id: '507f1f77bcf86cd799439011',
        photo: 'http://www.viaprestige-lifestyle.com/wp-content/uploads/2016/09/hotel-luxe-Bali-puti-walandari-ubud-660x330.jpg',
        title: 'hotel marhba',
        description: 'hotel profite des sejours au bord de mer ',


    }
];

app.get('/', (req, res) => {
    res.json({ message: "Booki API v1" })
})

app.get('/hebergements', async (req, res) => {
    try {
        const resp = await Hebergement.find()
        console.log(resp);
        return res.json(resp)
    } catch (err) {
        console.log({ err })
    }
})

app.post('/hebergements', async (req, res) => {
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

app.put('/hebergements/:id', (req, res) => {
    const { id } = req.params
    console.log(req.body);
    const validationResult = updateHebergementValidator.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
        return res.json(validationResult)
    }
    hebergements = hebergements.map(t => t._id === id ? { ...t, ...req.body } : t)
    return res.json({
        message: "Hebergement updated successfully"
    })
})

app.delete('/hebergements/:id', (req, res) => {
    const { id } = req.params
    const hebergementToDelete = hebergements.find(t => t._id === id)
    if (!hebergementToDelete) {
        return res.status(404).json({ error: 'Hebergement not found' })
    }
    hebergements = hebergements.filter(t => t._id !== id)
    return res.json({
        message: "Hebergement deleted successfully"
    })
})

app.get('/hebergements/:id', async (req, res) => {
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



const PORT = process.env.PORT

mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if (err) {
        console.log('Could not connect to database');
        console.log(err.message);
        return;
    }
    console.log('Connection with db established');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})