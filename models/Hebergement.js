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
  
})

module.exports = model('Hebergement', hebergementSchema)
