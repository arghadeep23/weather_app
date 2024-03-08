import "../styles/Accordion.scss";
import AccordionItemCard from "./AccordionItemCard";
export default function Accordion({ forecast, date, toggle, index, selected }) {
    function getFormattedDate(date) {
        // formats the date from the format "2024-03-06 21:00:00" to "6 March, 2024"
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
        // The Accordion component is used to display the forecast for the next 5 days
        <div className={`item ${selected == index ? 'selected' : ''}`}>
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
                                    <AccordionItemCard forecast={forecast} key={index} />

                                )
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}