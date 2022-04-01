const bcrypt = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const User = require('../models/User');
const { loginValidator } = require('../utilities/validators');
const loginUser = async (req, res) => {
    try {
        const validationResult = loginValidator.validate(req.body, { abortEarly: false })
        console.log(validationResult)
        if (validationResult.error) {
            return res.status(400).json(validationResult)
        }
        const { username, password } = req.body
        if (username!=="admin") {
            return res.status(401).json({
                error: 'Wrong username and/or password'  
            })
        }
        const user = await User.findOne({ username })
        console.log(user)
        const passwordsMatch = await bcrypt.compare(password, user.password)
        if (passwordsMatch) {
            return res.status(401).json({
                error: 'Wrong username and/or password'
            })
        }
        user.password = undefined
        const token = jsonwebtoken.sign({ userId: user._id }, process.env.JWT_SECRET)
        console.log(token)
        res.json({
            message: `Welcome ${user.username}`,
             user,
            token
        })
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

module.exports = {loginUser}
    
