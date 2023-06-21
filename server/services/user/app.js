'use strict'

const express = require('express')
require('dotenv').config()
const cors = require('cors')
const router = require('./routes/users')
const { mongoConnect } = require('./config/mongoConnection')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/users', router)

const runner = async () => {
    try {
        await mongoConnect()
        app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`))
    } catch (err) {
        console.log("Failed to connect to mongodb");
    } 
}
runner()
    // (async () => {
    //     try {
    //         await mongoConnect()
    //         app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`))
    //     } catch (err) {
    //         console.log("Failed to connect to mongodb");
    //     }
    // })()