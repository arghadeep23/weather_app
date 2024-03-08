require('dotenv').config()
// used express to create a server
const express = require('express');
const app = express();
// used cors to allow cross-origin requests
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content- Range'
};
app.use(cors(corsOptions));
// this endpoint is only for testing purposes
app.get('/', (req, res) => {
    res.send('Hello World');
})
// this endpoint is used to fetch the detailed location using the latitude and longitude provided by OpenWeatherMap API 
app.get('/region/:lat/:lon', async (req, res) => {
    //  the latitude and longitude are passed as parameters in the URL
    let lat = req.params.lat;
    let lon = req.params.lon;
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.VITE_OPENWEATHER_API}`);
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
})
// this endpoint is used to fetch the latitude and longitude of the user entered location using OpenWeatherMap API
app.get('/lat-long/:id', async (req, res) => {
    //  the location is passed as a parameter in the URL
    const id = req.params.id;
    // console.log(id);
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${id}&limit=1&appid=${process.env.VITE_OPENWEATHER_API}`);
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
})
// this endpoint is used to fetch the forecast using the latitude and longitude
app.get('/forecast/:lat/:lon/:unit', async (req, res) => {
    // latitude, longitude and unit are passed as parameters in the URL
    let lat = req.params.lat;
    let lon = req.params.lon;
    let unit = req.params.unit;
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.VITE_OPENWEATHER_API}&units=${unit}`);
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
});
//  backend is running on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})