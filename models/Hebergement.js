const { Schema, model } = require('mongoose')

const hebergementSchema = new Schema({
    photo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    categories:{
        type: String,
        required: true
    },
    rating: Number,
    adress: {
        type: String,
        required: true
    }
  
})

module.exports = model('Hebergement', hebergementSchema)
