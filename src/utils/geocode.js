const request = require('request')

const geocode = (city , callback) => {
    
    const key_Mapbox = 'pk.eyJ1IjoibmFyaXMiLCJhIjoiY2szdGx6MDE1MDJhMzNkcGRxZWNpdDh3ciJ9.6-NdAJXOu36PsldtrMc15g'
    const curl_Mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(city) + '.json?access_token='+key_Mapbox +'&limit=10&language=en'
    request({url: curl_Mapbox , json : true}, (error, response, body) => {

        if(error){

            callback('Unable to connect to geocode service!', undefined)

        }else if(body.message == 'Not Found'){
            
            callback('Please enter city name', undefined)

        }else if(body.features.length === 0){

            callback('Unable to reach the location!', undefined)

        }else{
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                city: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode