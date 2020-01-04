const request = require('request')

const forecast = (latitude , longitude , callback) => {

    const url = 'https://api.darksky.net/forecast/6390fdb1879ec8d579c141b4017de805/'+ latitude +','+ longitude
    const key_Mapbox = 'pk.eyJ1IjoibmFyaXMiLCJhIjoiY2szdGx6MDE1MDJhMzNkcGRxZWNpdDh3ciJ9.6-NdAJXOu36PsldtrMc15g'
    const curl_Mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/thailand.json'+'?access_token='+key_Mapbox +'&limit=10&language=en'


    // request({url : url , json: true} , (error, response, body) => {
    request({url, json: true}, (error, response, body) => {
        
        if(error){
            //Error connection
            callback('Unable to connect to weather service!', undefined)
    
        }else if(body.error){
            //Error 400 Poorly formatted request
            callback('Unable to find location!', undefined)
        }else {
            //Success 
            
            const data = {
                summary:  body.currently.summary , 
                timezone: body.timezone,
                temperature: body.currently.temperature
            }
            callback(undefined, data)
        }
    })
}


module.exports = forecast