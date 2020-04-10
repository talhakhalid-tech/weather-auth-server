const mongoose = require('mongoose')

const url=process.env.MONGODB 


mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(()=>{
    console.log('connected')
}).catch((e)=>{
    console.log(e)
})