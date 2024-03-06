import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
function App() {
  const [location, setLocation] = useState('');
  const [forecast, setForecast] = useState(null);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    // Fetch the user's current location when the component mounts
    // console.log('Fetching user location')
    fetchUserLocation();
  });

  async function fetchUserLocation() {
    if (navigator.geolocation && !flag) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        await fetchForecast(latitude, longitude);
        setFlag(true);
      }, (error) => {
        console.error('Error fetching user location:', error);
      });
    }
  };
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
      setForecast(response);
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
    if (location === '') {
      alert('Please enter a valid location');
      return;
    }
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
      {forecast && <Overview forecast={forecast} />}
    </>
  )
}

export default App
