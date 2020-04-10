const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = `https://api.darksky.net/forecast/9b6e9aa1072d9ac3c7193decaf35dbed/${latitude},${longitude}?units=si`

    request({url,json: true}, (error,{body}) => {
        if(error){
            callback('Unable to connect to Weather Service!!!',undefined)

        } else if(body.error){
            callback('Unable to find Location!!!',undefined)

        } else{
            callback(undefined,`${body.daily.data[0].summary}, It is currently ${body.currently.temperature} degrees celsius out.
                    The High today is ${body.daily.data[0].temperatureHigh} celsius with a Low of ${body.daily.data[0].temperatureLow} celsius. There is a ${body.currently.precipProbability}% chance of rain`)

        }
    })
}

module.exports = forecast