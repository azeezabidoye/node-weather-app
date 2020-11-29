const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utility/geocode')
const forecast = require('./utility/forecast')

const app = express()
const port = process.env.PORT || 3000

// PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')

// HANDLE BARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// SETUP STATIC EXPRESS DIRECTORY
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Azeez Abidoye'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Provide an address.'
        })
    }

    geoCode (req.query.address, (error, {longitude, latitude, location} = {}) => {
    
        if (error) {
            return res.send({ error })
        } 
            forecast (longitude, latitude, (error, forecastData) => {
    
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    address: req.query.address,
                    temperature: forecastData.temp,
                    weatherStatus: forecastData.weatherDescription,
                    location
                })
            }) 
    })

})

app.listen(port, () => {
    console.log(`Application is running on port ${port}`)
})