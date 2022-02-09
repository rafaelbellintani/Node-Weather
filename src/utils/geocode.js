const request = require('postman-request')

const access_token = 'pk.eyJ1IjoicmFmYWVsYmVsbGludGFuaSIsImEiOiJja3pjc3AycmYycnBmMndwMWJpYnBpaWJ5In0.vuDwTXcn1payXvVDhl1Cdw'
const endpoint = 'mapbox.places'

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/${endpoint}/${address}.json?access_token=${access_token}`

    request({url: url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to the service!')
        }else if(!response.body.features[0]){
            callback("Unable to complete the request, the search doesn't match any result!")
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode
