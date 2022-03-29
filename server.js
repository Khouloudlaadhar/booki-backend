const express = require('express');
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

app.get('/hebergements', (req, res) => {
    res.json(hebergements)
})

app.post('/hebergements', (req, res) => {
    console.log(req.body);
    const validationResult = hebergementValidator.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
        return res.json(validationResult)
    }
    const newHebergement = {
        _id: Date.now().toString(),
        ...req.body
    }
    hebergements.push(newHebergement)
    return res.json({
        message: "Hebergement created successfully",
        hebergement: newHebergement
    })
})

app.put('/hebergements/:id', (req, res) => {
    const { id } = req.params
    console.log(req.body);
    const validationResult = updateHebergementValidator.validate(req.body, { abortEarly: false })
    if (validationResult.error) {
        return res.json(validationResult)
    }
    hebergements = hebergements.map(t => t._id === id ? {...t, ...req.body} : t)
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
    hebergements = hebergements.filter(t => t._id !== id )
    return res.json({
        message: "Hebergement deleted successfully"
    })
})

app.get('/hebergements/:id', (req, res) => {
    const { id } = req.params
    const hebergement= hebergements.find(t => t._id === id)
    if (!hebergement) {
        return res.status(404).json({ error: 'Hebergement not found' })
    }
    return res.json(hebergement)
})



const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})