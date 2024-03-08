import "../styles/AccordionItemCard.scss";
import { useContext } from 'react';
import { TempContext } from '../store/TempContext';
import Snow from "../assets/snow.svg";
import Rain from "../assets/rain.svg";
import Clouds from "../assets/clouds.svg";
import Weather from "../assets/weather.svg";
export default function AccordionItemCard({ forecast }) {
    const { unit } = useContext(TempContext);
    const convertTimeFormat = (time) => {
        const parts = time.split(':');
        return `${parts[0]}:${parts[1]}`;
    };
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
    function weatherIconSelect() {
        const icon = Weather;
        switch (forecast.weather[0].main) {
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
        <div className="detail">
            <div className="time">
                <span>{convertTimeFormat(forecast.dt_txt.split(' ')[1])}</span>
            </div>
            <div className="weather">
                <span>{capitalizeFirstLetter(forecast.weather[0].main)}</span>
                <span>{forecast.main.temp} °{unit[0]}</span>
            </div>
            <div className="weatherIcon">
                <object type="image/svg+xml" data={weatherIconSelect()} className="icon">
                    Your browser does not support SVG
                </object>
            </div>
        </div>
    )
}