const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const hebergementRouter=require('./routes/hebergements');
const usersRouter = require('./routes/users')

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors({ credentials: true, origin: [ process.env.WEB_APP_URL ] }))


app.get('/', (req, res) => {
    res.json({ message: "Booki API v1" })
})

app.use('/hebergements', hebergementRouter)
app.use('/auth', usersRouter)

const PORT = process.env.PORT

mongoose.connect(process.env.DB_CONNECTION, (err) => {
    if (err) {
        console.log('Could not connect to database');
        console.log(err.message);
        return;
    }
    console.log('Connection with db established');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})