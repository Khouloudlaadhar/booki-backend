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


module.exports = {
    hebergementValidator,
    updateHebergementValidator
}