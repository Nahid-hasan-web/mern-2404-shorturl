const express = require('express')
const urlRoute = require('./api/url')
const route = express.Router()

route.use('/url',urlRoute)


module.exports = route