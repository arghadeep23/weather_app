import "../styles/DetailedWeather.scss";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import Accordion from "./Accordion";
export default function DetailedWeather({ forecast }) {
    const [groupedForecasts, setGroupedForecasts] = useState({});
    useEffect(() => {
        if (!forecast)
            return;
        // Function to group forecasts by date
        const groupForecastsByDate = () => {
            const grouped = forecast.list.reduce((acc, forecast) => {
                const date = forecast.dt_txt.split(' ')[0]; // Extract date from dt_txt
                if (!acc[date]) {
                    acc[date] = [];
                }
                acc[date].push(forecast);
                return acc;
            }, {});
            return grouped;
        };
        // console.log(groupForecastsByDate());
        setGroupedForecasts(groupForecastsByDate());
    }, [forecast]);
    const [selected, setSelected] = useState(null);
    const toggle = (i) => {
        if (selected === i) {
            return setSelected(null);
        }
        else
            setSelected(i);
    }
    return (
        <>
            {forecast &&
                <div className="detailedWeather">
                    <div className="heading">
                        <h2>Next {Math.min(Object.keys(groupedForecasts).length, 5)} days</h2>
                        <hr />
                    </div>
                    <div className="accordion">
                        {
                            Object.keys(groupedForecasts).map((date, index) => {
                                if (index > 4)
                                    return null;
                                return (
                                    <Accordion key={index} toggle={toggle} forecast={groupedForecasts[date]} date={date} selected={selected} index={index} />
                                )
                            })
                        }
                    </div>
                </div>
            }
            {
                !forecast && <Loader />
            }
        </>
    )
}