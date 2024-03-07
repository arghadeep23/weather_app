import "../styles/Navbar.scss";
import { useState } from 'react';
import GeoLocation from "../assets/geolocation.svg";
import { TempContext } from '../styles/src/TempContext';
import { useContext } from 'react';
export default function Navbar({ handleChange, handleSubmit, location, handleUnit, handleGeo }) {
    const { unit } = useContext(TempContext);
    return (
        <>
            <header>
                <div className="left">
                    <h1>WeatherMan</h1>
                </div>
                <div className="right">
                    <form action="" onSubmit={(event) => handleSubmit(event)}>
                        <input type="text" placeholder="Search for cities or locations" value={location} onChange={(event) => handleChange(event)} />
                        <button type="submit">Search</button>
                    </form>
                    <div className="features">
                        <button className="geoIcon" onClick={handleGeo}>
                            {/* <object type="image/svg+xml" data={GeoLocation} className="icon" onClick={handleGeo}>
                                Your browser does not support SVG
                            </object> */}
                            <img src={GeoLocation} alt="Geo location" className="icon" />
                        </button>
                        <button className="tempChange" onClick={handleUnit}>Convert to {unit === 'Celsius' ? 'Fahrenheit' : 'Celcius'}</button>
                    </div>
                </div>
            </header>
        </>
    )

}