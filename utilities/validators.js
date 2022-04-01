const Joi = require('joi')

const hebergementValidator = Joi.object({
    photo: Joi.string().required(),
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
  
})

const updateHebergementValidator = Joi.object({
    photo: Joi.string(),
    title: Joi.string().min(2).max(70),
    description: Joi.string(),
})

const registerValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required().min(6)
})
const loginValidator = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})


module.exports = {
    hebergementValidator,
    updateHebergementValidator,
    registerValidator,
    loginValidator
}