import "../styles/AccordionItem.scss";
import AccordionItemCard from "./AccordionItemCard";
export default function Accordion({ forecast, date, toggle, index, selected }) {
    // console.log(forecast);
    // console.log(index);
    function getFormattedDate(date) {
        //"2024-03-06 21:00:00"
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const year = date.substring(0, 4);
        const month = date.substring(5, 7);
        let day = date.substring(8, 10);
        if (day[0] == '0') {
            day = day[1];
        }
        const monthName = months[parseInt(month, 10) - 1];
        // Create the formatted date string
        return `${day} ${monthName}, ${year}`;
    }
    return (
        <div className="item">
            <div className="title" onClick={() => toggle(index)}>
                <h3>Forecast for {getFormattedDate(date)}</h3>
                <span>{selected === index ? '-' : '+'}</span>
            </div>
            {
                selected == index &&
                <div className="content">
                    <div className="details">
                        {
                            forecast.map((forecast, index) => {
                                return (
                                    // <AccordionItemCard />
                                    <div key={index} className="detail">
                                        <span>{forecast.dt_txt.split(' ')[1]}</span>
                                        <span>{forecast.weather[0].description}</span>
                                        <span>{forecast.main.temp}°C</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}