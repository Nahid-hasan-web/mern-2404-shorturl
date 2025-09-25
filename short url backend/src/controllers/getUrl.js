const generateRandomText = require("../helpers/genarateRandomText")

const getUrl = (req,res)=>{
    const {longUrl} = req.body

    const randomText = generateRandomText()

    res.send(req.body)
}


module.exports = {getUrl}