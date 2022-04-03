const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');
const { loginValidator, registerValidator } = require('../utilities/validators');
const loginUser = async (req, res) => {
    try {
        const validationResult = loginValidator.validate(req.body, { abortEarly: false })
        console.log(validationResult)
        if (validationResult.error) {
            return res.status(400).json(validationResult)
        }
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                error: 'Wrong email and/or password'  
            })
        }
       
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (passwordsMatch) {
            return res.status(401).json({
                error: 'Wrong email and/or password'
            })
        }
        user.password = undefined
        const token = jsonwebtoken.sign({ userId: user._id }, process.env.JWT_SECRET)
        console.log(token)
        res.json({
            message: `Welcome ${user.firstName}`,
            user,
            token
        })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
const registerUser = async (req, res) => {
    try {
        const validationResult = registerValidator.validate(req.body, { abortEarly: false })
        
        console.log(validationResult)
        if (validationResult.error) {
            return res.status(400).json(validationResult)
        }
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(401).json({
                error: 'An account with this email exists already'
            })
        }
        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = new User({
            ...req.body,
            password: hashedPassword
        })
        const createdUser = await user.save()
        res.status(201).json({
            message: 'Account created successfully',
            user: createdUser
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = {
    loginUser,
    registerUser
}
    
