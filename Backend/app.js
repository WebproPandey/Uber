const dotenv  =  require('dotenv')
dotenv.config() 

const express =  require('express')
const  app = express()
const cors =  require('cors')
const  connectTodb  =  require("./db/db")
const  userRoutes = require('./routes/userRoute') 
const  captainRoutes  = require('./routes/captainRoute')
const mapRoutes =  require("./routes/mapRoute")
const rideRoutes =  require("./routes/rideRoute")



const   cookieParser =  require('cookie-parser')  
connectTodb()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get('/' , (req , res) =>{
    res.send('Hello World!')
})
app.use('/users' , userRoutes)
app.use('/captains' , captainRoutes)
app.use('/maps' , mapRoutes)
app.use('/rides' , rideRoutes)


module.exports =  app  