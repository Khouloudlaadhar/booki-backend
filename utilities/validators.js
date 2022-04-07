const Joi = require('joi')

const hebergementValidator = Joi.object({
    photo: Joi.string().required(),
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    rating:Joi.number(),
    adress:Joi.string().required()

})

const updateHebergementValidator = Joi.object({
    photo: Joi.string(),
    title: Joi.string().min(2).max(70),
    description: Joi.string(),
    rating:Joi.number(),
    adress:Joi.string().required()
})

const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})
const loginValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})



module.exports = {
    hebergementValidator,
    updateHebergementValidator,
    registerValidator,
    loginValidator
}