require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT',
    credentials: true,
    allowedHeaders: 'Content-Type,Authorization',
    exposedHeaders: 'Content-Range,X-Content- Range'
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.get('/lat-long/:id', async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${id}&limit=1&appid=${process.env.OPENWEATHER_API}`);
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
})
app.get('/forecast/:lat/:lon/:unit', async (req, res) => {
    let lat = req.params.lat;
    let lon = req.params.lon;
    let unit = req.params.unit;
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API}&units=${unit}`);
        const data = await response.json();
        res.json(data);
    }
    catch (error) {
        console.log(error);
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})