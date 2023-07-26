import { useEffect, useState } from "react";
import BarChart from "./barchart/BarChart";
import "./forecast.css";

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
        date: ""
    }])
    const [focusMode, setFocusMode] = useState("temperature");

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

    useEffect(() => {
        setForecast(data.forecast);
    }, [data]);

    return (
        <div className="forecast">
            <div className="days">
            {
                forecast.map((i, index) => (
                    <div key={index} onClick={()=>setFocusDay(index)} className={index===focusDay?"focused_day":"day"}>                        
                        <span className="date">{formatDate(i.date)}</span>
                        <img src={i.day.condition.icon} alt={i.day.condition.text} />
                        <div className="max-min-temperature">
                            <div>макс: <span>{i.day.maxtemp_c}°C</span></div>
                            <div>мін: <span>{i.day.mintemp_c}°C</span></div>
                        </div>
                    </div>
                ))
            }
            </div>
            <BarChart data={forecast[focusDay].hour} type={focusMode} />
            <div className="params">
            {
                ["temperature","chance_of_rain","wind"].map((i, index) => (
                    <span key={index} onClick={() => setFocusMode(i)} className={i === focusMode ? "focused_param" : "param"}>{i}</span>
                ))
            }
            </div>
        </div>
    )
}

export default Forecast;