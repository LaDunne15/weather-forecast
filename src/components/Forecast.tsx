import { useEffect, useState } from "react";
import BarChart from "./BarChart";

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

    useEffect(() => {
        setForecast(data.forecast);
    }, [data]);

    return (
        <div>
            <h3>Прогноз на 3 дня:</h3>
            {
                forecast.map((i, index) => (
                    <div key={index} onClick={()=>setFocusDay(index)} className={index===focusDay?"border":""}>
                    <img src={i.day.condition.icon} alt={i.day.condition.text} />
                    <p>t: {i.day.mintemp_c}...{i.day.maxtemp_c}</p>
                    <p>{i.date}</p>
                    </div>
                ))
            }
                <div>
                {
                    ["temperature","chance_of_rain","wind"].map((i, index) => (
                    <div key={index} onClick={() => setFocusMode(i)} className={i === focusMode ? "border" : ""}>{i}</div>
                ))}
                </div>
                <BarChart data={forecast[focusDay].hour} type={focusMode} />
        </div>
    )
}

export default Forecast;