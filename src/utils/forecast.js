const request = require('postman-request')

const access_token = 'b07c99d20bf4cb56a85a60cc6962829c'

const forecast = (latitude, longitude, callback) => {
const url = `http://api.weatherstack.com/current?access_key=${access_token}&query=${latitude},${longitude}`

request({url: url, json: true}, (error, response) => {

    const { temperature, wind_speed, precip, humidity, cloudcover } = response.body.current
    const { query:location } = response.body.request

    if(error){
        callback('Unable to connect to the service!')
    }else if(response.body.error){
        callback('Unable to search forecast on this position, try again with another!')
    }else{
        callback(undefined, {
            location,
            temperature,
            weather_description: response.body.current.weather_descriptions[0],
            wind_speed,
            precip,
            humidity,
            cloudcover
        })
    }
})
}

module.exports = forecast
