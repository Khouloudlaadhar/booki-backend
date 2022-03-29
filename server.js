const express = require('express')

require('dotenv').config()

const app = express()

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

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})