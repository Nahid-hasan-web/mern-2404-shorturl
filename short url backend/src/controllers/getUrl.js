const generateRandomText = require("../helpers/genarateRandomText")
const urlMode = require("../models/urlMode")

const getUrl = async (req,res)=>{
    const {longUrl} = req.body

    const randomText = generateRandomText()

    await new urlMode({
        longUrl , 
        shortId:randomText
    }).save()

    res.send(`http://localhost:8000/url/${randomText}`)
}


module.exports = {getUrl}