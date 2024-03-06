import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
function App() {
  const [location, setLocation] = useState('');
  const fetchLatLong = async (location) => {
    try {
      const response = await fetch(`http://localhost:3000/lat-long/${location}`).then(response => response.json());
      console.log(response);
      return {
        lat: response[0].lat,
        lon: response[0].lon
      }
    }
    catch (error) {
      console.log(error);
    }
  }
  const fetchForecast = async (lat, long) => {
    try {
      const response = await fetch(`http://localhost:3000/forecast/${lat}/${long}`).then(response => response.json());
      console.log(response);
    }
    catch (error) {
      console.log(error);
    }
  }
  function handleChange(event) {
    setLocation(event.target.value);
  }
  async function handleSubmit(event) {
    event.preventDefault();
    // first fetch the latitude and longitude using openweathermap api
    const obj = await fetchLatLong(location);
    const lat = obj.lat;
    const long = obj.lon;
    // then fetch the forecast using the latitude and longitude
    fetchForecast(lat, long);
  }
  return (
    <>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} location={location} />
    </>
  )
}

export default App
