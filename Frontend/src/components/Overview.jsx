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
export default function Overview({ forecast }) {
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
                <div className="leftDiv">
                    <div className="iconShow">
                        <object type="image/svg+xml" data={weatherIconSelect()} className="icon">
                            Your browser does not support SVG
                        </object>
                    </div>
                    <div className="temperature">
                        <span>{forecast.list[0].main.temp} °C</span>
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
                            <span>{forecast.city.name}</span>,   &nbsp;
                            <span>{forecast.city.country}</span>
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
                            <span className="values">{forecast.list[0].wind.speed} km/hr</span>
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
                <div className="fiveDayWeather">
                    <div className="fiveDayWeatherContent">
                        {
                            forecast.list.map((item, index) => {
                                if (index % 8 === 0) {
                                    return (
                                        <div key={index} className="fiveDayWeatherCard">
                                            <div className="fiveDayWeatherDate">
                                                <span>{getFormattedDate(item.dt_txt)}</span>
                                            </div>
                                            <div className="dayWeatherInfo">
                                                <div className="fiveDayWeatherTemp">
                                                    <span>{item.main.temp} °C</span>
                                                </div>
                                                <div className="fiveDayWeatherMain">
                                                    <span>{item.weather[0].main}</span>
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