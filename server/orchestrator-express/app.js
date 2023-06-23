'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const errorHandling = require('./middlewares/errorHandling')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(errorHandling)

app.listen(PORT, () => console.log(`Listening on PORT:${PORT}`))