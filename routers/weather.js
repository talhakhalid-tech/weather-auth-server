const express = require('express')
const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')


const router = new express.Router()

router.get('/weather',(req,res) => {

    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,data) => {
            if(error){
                return res.send({ error })
            }  
            res.send({
                forecast: data,
                location: location,
                address: req.query.address
            })
        })
    })

})


module.exports = router