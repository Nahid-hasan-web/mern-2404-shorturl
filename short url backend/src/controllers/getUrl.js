const generateRandomText = require("../helpers/genarateRandomText")
const urlMode = require("../models/urlMode")

const getUrl = async (req,res)=>{
try{
        const {longUrl} = req.body

    const randomText = generateRandomText()

    await new urlMode({
        longUrl , 
        shortId:randomText
    }).save()

    res.status(200).send({longUrl:longUrl , shortUrl:`http://localhost:8000/url/${randomText}`})
}catch(err){
    res.status(501).send({message:'internal server error' , error:err})
}
}


module.exports = {getUrl}