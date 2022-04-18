const { Schema, model } = require('mongoose')

const tokenSchema = new Schema({

    userId:  {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"User"
    },
    token: {
        type:String,
        required: true,
    },
    createAt:{
        type:Date,
        default:Date.now,
        expires:3600
    } 
    

}, { timestamps: true })

module.exports = model('Token', tokenSchema)