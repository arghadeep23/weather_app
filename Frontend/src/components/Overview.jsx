import "../styles/Overview.scss";
import Location from "../assets/location.svg";
import Date from "../assets/date.svg";
import Weather from "../assets/weather.svg";
import Wind from "../assets/wind.svg";
import Pressure from "../assets/pressure.svg";
import Visibility from "../assets/visibility.svg";
import Humidity from "../assets/Humidity.svg";
import Snow from "../assets/snow.svg";
import Rain from "../assets/rain.svg";
import Clouds from "../assets/clouds.svg";
import Loader from "./Loader";
import { useContext } from 'react';
import { TempContext } from '../store/TempContext';
export default function Overview({ forecast, region }) {
    function capitalizeFirstLetter(str) {
        // Check if the string is not empty
        if (str.length > 0) {
            // Convert the first character to uppercase and concatenate it with the rest of the string
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            // If the string is empty, return it as it is
            return str;
        }
    }
    const { unit } = useContext(TempContext);
    function getFormattedDate(date) {
        //"2024-03-06 21:00:00"
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = date.substring(0, 4);
        const month = date.substring(5, 7);
        let day = date.substring(8, 10);
        // if (day[0] == '0') {
        //     day = day[1];
        // }
        const monthName = months[parseInt(month, 10) - 1];
        // Create the formatted date string
        return `${day} ${monthName}, ${year}`;
    }
    function weatherIconSelect() {
        const icon = Weather;
        switch (forecast.list[0].weather[0].main) {
            case "Rain":
                return Rain;
            case "Snow":
                return Snow;
            case "Clouds":
                return Clouds;
            default:
                return icon;
        }
    }
    return (
        <div className="overview">
            {forecast && <>
                <div className="wrapper">
                    <div className="leftDiv">
                        <div className="iconShow">
                            <object type="image/svg+xml" data={weatherIconSelect()} className="icon">
                                Your browser does not support SVG
                            </object>
                        </div>
                        <div className="temperature">
                            <span>{forecast.list[0].main.temp} °{unit[0]}</span>
                        </div>
                        <hr />
                        <div className="weatherMain">
                            <span>{forecast.list[0].weather[0].main}</span>
                        </div>
                        <div className="subDiv loc">
                            <div className="iconImg">
                                <object type="image/svg+xml" data={Location} className="icon">
                                    Your browser does not support SVG
                                </object>
                            </div>
                            <div className="type">
                                <span>{region.city}</span>,   &nbsp;
                                <span>{region.state}</span>,   &nbsp;
                                <span>{region.country}</span>
                            </div>
                        </div>
                        <div className="subDiv">
                            <div className="iconImg">
                                <object type="image/svg+xml" data={Date} className="icon">
                                    Your browser does not support SVG
                                </object>
                            </div>
                            <div className="type">
                                <span>{getFormattedDate(forecast.list[0].dt_txt)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="weather-info">
                        <div className="widget1">
                            <div className="iconImg">
                                <object type="image/svg+xml" data={Wind} className="icon">
                                    Your browser does not support SVG
                                </object>
                            </div>
                            <div className="type">
                                <span className="widgetName">Wind</span>
                                <span className="values">{forecast.list[0].wind.speed} m/s</span>
                            </div>
                        </div>
                        <div className="widget1">
                            <div className="iconImg">
                                <object type="image/svg+xml" data={Pressure} className="icon">
                                    Your browser does not support SVG
                                </object>
                            </div>
                            <div className="type">
                                <span className="widgetName">Pressure</span>
                                <span className="values">{forecast.list[0].main.pressure} hPA</span>
                            </div>
                        </div>
                        <div className="widget1">
                            <object type="image/svg+xml" data={Visibility} className="icon">
                                Your browser does not support SVG
                            </object>
                            <div className="type">
                                <span className="widgetName">Visibility</span>
                                <span className="values">{parseFloat(forecast.list[0].visibility) / 1000} km</span>
                            </div>
                        </div>
                        <div className="widget1">
                            <object type="image/svg+xml" data={Humidity} className="icon">
                                Your browser does not support SVG
                            </object>
                            <div className="type">
                                <span className="widgetName">Humidity</span>
                                <span className="values">{forecast.list[0].main.humidity}%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="fiveDayWeather">
                    <div className="fiveDayWeatherContent">
                        {
                            forecast.list.map((item, index) => {
                                if (index % 8 === 0 && index <= 32) {
                                    return (
                                        <div key={index} className="fiveDayWeatherCard">
                                            <div className="fiveDayWeatherDate">
                                                <span>{getFormattedDate(item.dt_txt)}</span>
                                            </div>
                                            <div className="dayWeatherInfo">
                                                <div className="fiveDayWeatherMain">
                                                    <span>{capitalizeFirstLetter(item.weather[0].main)}</span>
                                                </div>
                                                <div className="fiveDayWeatherTemp">
                                                    <span>{item.main.temp} °{unit[0]}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                                return null;
                            })
                        }
                    </div>
                </div>
            </>
            }
            {
                !forecast && <Loader />
            }
        </div>
    )
}
