const express = require('express')
const urlRoute = require('./api/url')
const authRoute = require('./api/auth')
const route = express.Router()

route.use('/url',urlRoute)
route.use('/auth' , authRoute)

module.exports = route