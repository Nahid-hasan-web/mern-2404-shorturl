const express  = require('express')
const { getUrl } = require('../../controllers/getUrl')
const urlRoute = express.Router()

urlRoute.post('/sendLongUrl' , getUrl)






module.exports = urlRoute