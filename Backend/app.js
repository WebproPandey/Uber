const dotenv  =  require('dotenv')
dotenv.config() 

const express =  require('express')
const  app = express()
const cors =  require('cors')
const  connectTodb  =  require("./db/db")
const  userRoutes = require('./routes/userRoute') 
connectTodb()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/' , (req , res) =>{
    res.send('Hello World!')
})
app.use('/users' , userRoutes)

module.exports =  app  