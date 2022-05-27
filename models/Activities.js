const { Schema, model } = require('mongoose')

const activitiesSchema = new Schema({
    photo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,  
    adress: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }
    
})

module.exports = model('activities', activitiesSchema)