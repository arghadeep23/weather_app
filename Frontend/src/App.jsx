import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
import DetailedWeather from './components/DetailedWeather'
import Loader from './components/Loader'
import { TempContext } from './store/TempContext'
function App() {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState('Celsius');
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    // Fetch the user's current location when the component mounts
    // console.lunitching user location')
    fetchUserLocation();
  }, [flag]);
  function handleUnit() {
    console.log('hey');
    setUnit((prevTemp) => {
      if (prevTemp === 'Fahrenheit') {
        return 'Celsius';
      }
      else {
        return 'Fahrenheit';
      }
    })
  }
  function handleGeo() {
    setForecast(null);
    setFlag(false);
  }
  async function fetchUserLocation() {
    if (navigator.geolocation && !flag) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        console.log(position);
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lon: longitude });
        // console.log(latitude, longitude);
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
      // return {
      //   lat: response[0].lat,
      //   lon: response[0].lon
      // }
      setCoordinates({ lat: response[0].lat, lon: response[0].lon });
      return;
    }
    catch (error) {
      console.log(error);
    }
  }
  const fetchForecast = async (lat, long) => {
    try {
      const response = await fetch(`http://localhost:3000/forecast/${lat}/${long}/${unit === 'Celsius' ? 'metric' : 'imperial'}`).then(response => response.json());
      // console.log(response);
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
    setForecast(null);
    // first fetch the latitude and longitude using openweathermap api
    await fetchLatLong(location);
    // const lat = obj.lat;
    // const long = obj.lon;
    // then fetch the forecast using the latitude and longitude
    fetchForecast(coordinates.lat, coordinates.lon);
  }
  useEffect(() => {
    setForecast(null);
    fetchForecast(coordinates.lat, coordinates.lon);
  }, [unit, coordinates]);
  const tempCtx = {
    unit: unit
  }
  return (
    <TempContext.Provider value={tempCtx}>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} location={location} handleUnit={handleUnit} handleGeo={handleGeo} />
      {
        forecast &&
        <>
          <Overview forecast={forecast} />
          <DetailedWeather forecast={forecast} />
        </>
      }
      {
        !forecast && <div className="loading"><Loader /></div>
      }
    </TempContext.Provider>
  )
}

export default App
