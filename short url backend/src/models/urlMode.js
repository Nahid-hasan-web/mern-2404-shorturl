const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema({
    longUrl:{
        type:String, 
        required:true
    },
    shortId:{
        type:String, 
        required:true
    },
})

module.exports = mongoose.model('urls' , urlSchema)