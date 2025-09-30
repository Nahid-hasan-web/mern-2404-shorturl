const urlMode = require("../models/urlMode")

const runUrl =async (req ,res)=>{

    const {shortId} = req.params

    
    const exisistUrl = await urlMode.findOne({shortId})

    if(!exisistUrl) return res.status(404).send('url do not exisit')

    res.redirect(exisistUrl.longUrl)


}

module.exports = runUrl