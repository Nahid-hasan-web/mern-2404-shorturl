const express = require('express')
const { register, loginController, updateProfile } = require('../../controllers/authController')
const jwtVerifecation = require('../../middleware/jwtverifecation')
const authRoute = express.Router()

authRoute.post('/register' , register)
authRoute.post('/login' ,  loginController)
authRoute.post('/updateProfile' , jwtVerifecation , updateProfile)

module.exports = authRoute