const express  = require('express')
const { getUrl } = require('../../controllers/getUrl')
const runUrl = require('../../controllers/runUrl')
const urlRoute = express.Router()

urlRoute.post('/sendLongUrl' , getUrl)
urlRoute.get('/:shortId' , runUrl)






module.exports = urlRoute