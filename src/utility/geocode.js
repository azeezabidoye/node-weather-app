const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYXplZXphYmlkb3llIiwiYSI6ImNraGRocTNvZzA1dm4yem52aHFiNm9waGEifQ.e_i6O4HjCX3P39yFxgeJFw&limit=1'

    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to connect!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[1],
                latitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode
