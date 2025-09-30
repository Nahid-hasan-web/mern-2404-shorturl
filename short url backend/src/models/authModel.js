const mongoose = require('mongoose')

const authSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:String,
    }
}, {timestamps:true})


module.exports = mongoose.model('auths' , authSchema)