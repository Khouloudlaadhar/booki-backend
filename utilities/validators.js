const Joi = require('joi')

const hebergementValidator = Joi.object({
    photo: Joi.string().required(),
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    categories: Joi.string().required(),
    rating: Joi.number().min(0).max(5),
    adress: Joi.string().required(),
    city: Joi.string().required(),
    price: Joi.number().required()
    


})

const updateHebergementValidator = Joi.object({
    photo: Joi.string(),
    title: Joi.string().min(2).max(70),
    description: Joi.string(),
    categories: Joi.string().required(),
    rating: Joi.number().min(0).max(5),
    adress: Joi.string().required(),
    city: Joi.string().required(),
    price: Joi.number().required()
    
})

const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
})
const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
const passwordResetValidator = Joi.object({
    email: Joi.string().email().required(),

})
const contactValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    message: Joi.string().required().messages()
})

const activitiesValidator = Joi.object({
    photo: Joi.string().required(),
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    adress: Joi.string().required(),
    city: Joi.string().required()

    


})

const updateActivitiesValidator = Joi.object({
    photo: Joi.string().required(),
    title: Joi.string().required().min(2).max(70),
    description: Joi.string(),
    adress: Joi.string().required(),
    city: Joi.string().required()
    
})




module.exports = {
    hebergementValidator,
    updateHebergementValidator,
    registerValidator,
    loginValidator,
    passwordResetValidator,
    contactValidator,
    activitiesValidator,
    updateActivitiesValidator
}