const express  = require('express')
const app = express()
const port = 8000
const cors = require('cors')
const  route  = require('./src/routes/routes')
const  mongoose  = require('mongoose')
// ---------------- middleware 
app.use(cors())
app.use(express.json())
app.use(route)
// ---------------- db connection 
mongoose.connect('mongodb+srv://mern2404:mern2404@cluster0.xzxjjpv.mongodb.net/mern2404?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>console.log('db connected'))
.catch((err)=>console.log(err))
// ---------------- run port 
app.listen(port , (err)=>{
    if(err) return console.log(err)
    console.log(`this server is running at ${port}`)
})

