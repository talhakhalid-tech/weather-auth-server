const path = require('path')
const express = require('express')
require('../db/mongoose.js')
const userRouter = require('../routers/users')
const weatherRouter = require('../routers/weather')
const bodyParser = require('body-parser');
const cors =require('cors')


const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(weatherRouter)
app.use(userRouter)

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})