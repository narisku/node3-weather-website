const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

//Define paths for Express config
const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, "..", "templates",'views')
const partialsPath = path.join(__dirname, "..", "templates", 'partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
  
//Setup static directory to server  
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Naris Kunasol'
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: 'This is about page',
        name: 'Naris Kunasol'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'This is help page',
        name: 'Naris Kunasol'
    })
})

app.get('/weather', ( req , res ) => {
   
    const address = req.query.address

    if(!address){
            return res.send({
                error: 'Please provide an address term'
            })
        }  
    
    // geocode(address , (error, dataGeocode)=> {
    
    geocode(address, (error, {latitude , longitude, city } = {}) => { 
        if(error){
            return res.send({ error })            
        }
       
        forecast( latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({ error })
            }

            return res.send({
              forecast: forecastData.summary,
              timezone: forecastData.timezone,
              temperature: forecastData.temperature ,
              address: city
            })
        })
    })
           
})

app.get('/weather/*', (req, res)=>{
    res.render('error_page',{
        title: 'Error Page not found',
        message: 'Help article dose not found',
        name: 'Naris Kunasol'
    })
})

app.get('/help/*', (req, res)=>{
    // res.send('Help article dose not found')
    res.render('error_page',{
        title: 'Error Page not found',
        message: 'Weather page not found',
        name: 'Naris Kunasol'
    })
})

app.get('/product',(req, res)=>{
    
    if(!req.query.name){
        return res.send({
            error: 'Please enter the name you want to search!'
        })
    }

    console.log(req.query.name)
    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    // res.send('404 Not found')
    res.render('error_page',{
        title: '404 Page not found',
        message: '404 Not found',
        name: 'Naris Kunasol'
    })
})

app.listen(port, ()=>{
    console.log('Sever is upon port ' + port + '!')
})
