const path = require('path')
const express = require('express')
require('../db/mongoose.js')
const userRouter = require('../routers/users')
const weatherRouter = require('../routers/weather')
const bodyParser = require('body-parser');


const app = express()
const port = process.env.PORT || 5000

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin , X-Requested-With , Content-Type,Accept,x-auth-token"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET , POST , PATCH , DELETE");
    next();
});
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(weatherRouter)
app.use(userRouter)

app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
})