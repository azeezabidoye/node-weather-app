const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=712487c88ee4fb5706ae8cce8e09cd17&query=${longitude},${latitude}&units=m`

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect', undefined)
        } else if (response.body.current === undefined) {
            callback('Unable to find location', undefined)
        } else {
            const currentObj = response.body.current
            callback (undefined, {
            temp: currentObj.temperature,
            weatherDescription: currentObj.weather_descriptions[0]
            })
        }
    })
   
}

module.exports = forecast