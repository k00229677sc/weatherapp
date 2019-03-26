const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = 'e6c005fd9d3ee94a240274594e097f39';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      console.log(weather)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherName = `Location: ${weather.name}`
        let weatherDescription = `Currently ${weather.weather[0].description}`;
        let weatherIcon = `${weather.weather.icon}`;
        let weatherText = `It's ${weather.main.temp}°F`;
        let weatherHumidity = `The humidity is ${weather.main.humidity}%`;
        let weatherPressure = `The pressure is ${weather.main.pressure}`;
        let windSpeed = `The wind speed is currently ${weather.wind.speed}km/h`;
        let windDirection = `The wind direction is ${weather.wind.deg}°`;
        res.render('index', {weatherN: weatherName, weatherDesc: weatherDescription, weatherI: weatherIcon, weather: weatherText,
          weatherHum: weatherHumidity, weatherPress: weatherPressure, windSp: windSpeed, windDi: windDirection, error: null});
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
