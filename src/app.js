const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

const app = express()

const public = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(public))

app.get('', (req,res)=>{
    res.render('index',{
        title: "Weather",
        name: "Rafael"
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title: "Help",
        name: "Rafael",
        messageHelp: "Do you need help? contact me by email: rafaelbellintani@outlook.com"
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title: "About",
        name: "Rafael",
        messageHelp: "Do you need help? contact me by email: rafaelbellintani@outlook.com"
    })
})

app.get('/weather', (req,res)=> {
    const address = req.query.address
    if(!address){
        return res.send({
            error: "No address has been provided"
        })
    }

    geocode(address,(error, { latitude, longitude, place_name:location } = {})=>{
        if(error){
            return res.send({
                error
            })
        }else{
            forecast(longitude,latitude,(error,responseForecast)=>{
                const { weather_description:forecast, temperature, wind_speed, precip, humidity, cloudcover} = responseForecast
                if(error){
                    return res.send({
                        error
                    })
                }else{
                    res.send({
                        forecast,
                        location,
                        temperature,
                        wind_speed,
                        precip,
                        humidity,
                        cloudcover
                    })
                }
            })
        }
    })

    
})

app.get('/help/*',(req,res)=>{
    res.render('404page', {
        title: '404 Page not found',
        message: 'The article in help was not found',
        name: 'Rafael'
    })
})


app.get('*',(req,res)=>{
    res.render('404page', {
        title: '404 Page not found',
        message: 'The page that you looking for is not available',
        name: 'Rafael'
    })
})

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}.`)
})

