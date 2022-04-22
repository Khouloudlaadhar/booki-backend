const Joi = require('joi')

const hebergementValidator = Joi.object({
    photo: Joi.string().required(),
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    categories:Joi.string().required(),
    rating:Joi.number(),
    adress:Joi.string().required()

})

const updateHebergementValidator = Joi.object({
    photo: Joi.string(),
    title: Joi.string().min(2).max(70),
    description: Joi.string(),
    categories:Joi.string().required(),
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
const passwordResetValidator= Joi.object({
    email: Joi.string().email().required(),

})
const contactValidator=Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    message: Joi.string().required().messages()
})



module.exports = {
    hebergementValidator,
    updateHebergementValidator,
    registerValidator,
    loginValidator,
    passwordResetValidator,
    contactValidator
}