import "../styles/AccordionItemCard.scss";
export default function AccordionItemCard({ forecast }) {
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
    return (
        <div className="detail">
            <div className="time">
                <span>{convertTimeFormat(forecast.dt_txt.split(' ')[1])}</span>
            </div>
            <div className="weather">
                <span>{capitalizeFirstLetter(forecast.weather[0].description)}</span>
                <span>{forecast.main.temp}°C</span>
            </div>
        </div>
    )
}