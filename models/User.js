const { Schema, model } = require('mongoose')

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = model('User1', userSchema)