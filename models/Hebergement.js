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
    rating: {
        type:Number,
        min:0,
        max:5
    } ,
    adress: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    rooms:{
        type:[String],
        required: true
    },
    reservation: [ 
        {
            userId:  {
                type: Schema.Types.ObjectId,
                required: true,
                ref:"User"
            },
          start: Date,
          end: Date,
         
        }
    ]
})

module.exports = model('Hebergement', hebergementSchema)