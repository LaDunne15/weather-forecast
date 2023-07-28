import { useEffect, useState } from "react";
import BarChart from "./barchart/BarChart";
import "./forecast.css";
import ConditionIcon from "../condition_icon/ConditionIcon";

function Forecast(data: any) {

    const [focusDay, setFocusDay] = useState(0);
    const [forecast,setForecast] = useState([{
        day: {
          condition: {
            icon: "",
            text: ""
          },
          maxtemp_c: 0,
          mintemp_c: 0,
        },
        hour: [],
        date: "",
        astro: {
            sunrise: "",
            sunset: ""
        }
    }])
    const [focusMode, setFocusMode] = useState("температура");

    function formatDate(dateString: string): string {
        const [, month, day] = dateString.split('-');
        let ukrainianMonth = '';
        switch (Number(month)) {
            case 1:ukrainianMonth = 'січня';break;
            case 2:ukrainianMonth = 'лютого';break;
            case 3:ukrainianMonth = 'березня';break;
            case 4:ukrainianMonth = 'квітня';break;
            case 5:ukrainianMonth = 'травня';break;
            case 6:ukrainianMonth = 'червня';break;
            case 7:ukrainianMonth = 'липня';break;
            case 8:ukrainianMonth = 'серпня';break;
            case 9:ukrainianMonth = 'вересня';break;
            case 10:ukrainianMonth = 'жовтня';break;
            case 11:ukrainianMonth = 'листопада';break;
            case 12:ukrainianMonth = 'грудня';break;
            default:ukrainianMonth = 'невідомий';break;
        }
        return `${day} ${ukrainianMonth}`;
    }

    function Hour24(time12Hour: string): string {
        const [time, period] = time12Hour.split(" ");
        const [hoursStr, minutesStr] = time.split(":");
        const hours = parseInt(hoursStr, 10);
        const minutes = parseInt(minutesStr, 10);
        if (period === "AM" && hours === 12) {
          return `00:${minutes}`;
        }
        if (period === "PM" && hours !== 12) {
          return `${hours + 12}:${minutes}`;
        }
        return `${hours}:${minutes}`;
    }

    useEffect(() => {
        setForecast(data.forecast);
    }, [data]);

    return (
        <div className="forecast">
            <div className="days">
            {
                forecast.map((i, index) => (
                    <div key={index} onClick={()=>setFocusDay(index)} className={index===focusDay?"focused_day":"day"}>                        
                        <div>
                            <span className="date">{formatDate(i.date)}</span>
                        </div>
                        <ConditionIcon condition={i.day.condition}/>
                        <div className="max-min-temperature">
                            <div>макс: <span>{i.day.maxtemp_c}°C</span></div>
                            <div>мін: <span>{i.day.mintemp_c}°C</span></div>
                        </div>
                    </div>
                ))
            }
            </div>
            <span className="sun_range">Схід: {Hour24(forecast[focusDay].astro.sunrise)} Захід:{Hour24(forecast[focusDay].astro.sunset)}</span>
            <span className="condition_text">{forecast[focusDay].day.condition.text}</span>
            <BarChart data={forecast[focusDay].hour} type={focusMode} />
            <div className="params">
            {
                ["температура","ймовірність опадів","вітер"].map((i, index) => (
                    <span key={index} onClick={() => setFocusMode(i)} className={i === focusMode ? "focused_param" : "param"}>{i}</span>
                ))
            }
            </div>
        </div>
    )
}

export default Forecast;