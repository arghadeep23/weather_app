import "../styles/Overview.scss";
import Location from "../assets/location.svg";
import Date from "../assets/date.svg";
import Weather from "../assets/weather.svg";
import Wind from "../assets/wind.svg";
import Pressure from "../assets/pressure.svg";
import Visibility from "../assets/visibility.svg";
import Humidity from "../assets/Humidity.svg";
export default function Overview({ forecast }) {
    function getFormattedDate(date) {
        //"2024-03-06 21:00:00"
        // Define an array of month names
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        // Get the month, day, and year from the Date object
        const year = date.substring(0, 4);
        const month = date.substring(5, 7);
        const day = date.substring(8, 10);
        const monthName = months[parseInt(month, 10) - 1];
        // Create the formatted date string
        return `${day} ${monthName}, ${year}`;
    }
    return (
        <div className="overview">
            <div className="leftDiv">
                <div className="iconShow">
                    <object type="image/svg+xml" data={Weather} className="icon">
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
                        <span className="values">{forecast.list[0].visibility} km</span>
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
    )
}