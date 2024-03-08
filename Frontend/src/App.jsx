import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Overview from './components/Overview'
import DetailedWeather from './components/DetailedWeather'
import Loader from './components/Loader'
import { TempContext } from './store/TempContext'
function App() {
  const [location, setLocation] = useState(''); // location state that stores the user entered location
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 }); // coordinate state that stores the coordinates of the user entered location
  const [forecast, setForecast] = useState(null); // forecast of the user entered location
  const [unit, setUnit] = useState('Celsius'); // unit state that stores the current unit to be displayed (Celsius or Fahrenheit)
  const [flag, setFlag] = useState(false); // to prevent the user's location from being fetched multiple times, reduces bad API calls
  const [region, setRegion] = useState({
    city: '',
    country: '',
    state: ''
  }) // region state that stores the detailed location of the user entered location
  useEffect(() => {
    // Fetch the user's current location when the component mounts
    fetchUserLocation();
  }, [flag]);
  function handleUnit() {
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
        // console.log(position);
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
    // fetching the latitude and longitude of the user entered location using openweathermap api
    try {
      const response = await fetch(`https://weather-app-ok47.onrender.com/lat-long/${location}`).then(response => response.json());
      // console.log(response);
      setCoordinates({ lat: response[0].lat, lon: response[0].lon });
      return;
    }
    catch (error) {
      console.log(error);
    }
  }
  const fetchForecast = async (lat, long) => {
    // will do two things
    // 1. fetch the detailed location using the lat and long, this will set the "region" state's key value pairs
    // 2. fetch the forecast using the lat and long, this will set the "forecast" state's key value pairs
    try {
      const detailedLocation = await fetch(`https://weather-app-ok47.onrender.com/region/${lat}/${long}`).then(response => response.json());
      setRegion({
        city: detailedLocation[0].name,
        country: detailedLocation[0].country,
        state: detailedLocation[0].state
      })
      const response = await fetch(`https://weather-app-ok47.onrender.com/forecast/${lat}/${long}/${unit === 'Celsius' ? 'metric' : 'imperial'}`).then(response => response.json());
      setForecast(response);
    }
    catch (error) {
      console.log(error);
    }
  }
  function handleChange(event) {
    // changes the location with every keystroke of the user
    setLocation(event.target.value);
  }
  async function handleSubmit(event) {
    // deals with the user finally submitting the location
    event.preventDefault(); // to prevent the page from refreshing after submission
    // an alert to be triggered if location is empty, this prevents bad API calls
    if (location === '') {
      alert('Please enter a valid location');
      return;
    }
    // sets the forecast to null, so that the loading component is shown when there are no results
    setForecast(null);
    //fetches the latitude and longitude using openweathermap api
    await fetchLatLong(location);
    // fetches the forecast using the latitude and longitude
    fetchForecast(coordinates.lat, coordinates.lon);
  }
  useEffect(() => {
    // this special useEffect hook will only run when the unit or coordinates changes
    // this comes in handy when the user changes the unit, the forecast will be fetched again but with the new unit
    setForecast(null); // to show the loading component
    fetchForecast(coordinates.lat, coordinates.lon);
  }, [unit, coordinates]);
  // the context object to be passed to the TempContext.Provider
  const tempCtx = {
    // the unit context tells all the components what is the current unit that needs to be displayed
    // Celsius or Fahrenheit
    unit: unit
  }
  return (
    // to provide the context to all the components inside the Provider
    <TempContext.Provider value={tempCtx}>
      <Navbar handleChange={handleChange} handleSubmit={handleSubmit} location={location} handleUnit={handleUnit} handleGeo={handleGeo} />
      {
        forecast &&
        <>
          <Overview forecast={forecast} region={region} />
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
