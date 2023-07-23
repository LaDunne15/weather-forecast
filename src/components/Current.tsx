import { useEffect, useState } from "react";

function Current(data: any) {

    const [current, setCurrent] = useState({
        condition: {
            text: "",
            icon: "",
            code: ""
        },
        temp_c: 0,
        humidity: 0,
        wind_kph: 0,
        precip_mm: 0,
        wind_dir: "",
        wind_degree: 0,
        cloud: 0,
        pressure_mb: 0
    });

    useEffect(() => {
        setCurrent(data.current);
    },[data])

    return (
        <div>
            <h2>Поточний:</h2>            
            <img src={current.condition.icon} alt={current.condition.text} />
            <p>{current.condition.text}</p>
            <p>Температура: {current.temp_c} градусів Цельсія</p>
            <p>Вологість: {current.humidity} %</p>
            <p>Вітер: {current.wind_kph} км/год {current.wind_dir} ({current.wind_degree})</p>
            <p>Опади {current.precip_mm} мм</p>
            <p>Хмарність: {current.cloud} %</p>
            <p>Тиск: {current.pressure_mb * 0.75} мм рт. ст.</p>
        </div>
    )
}

export default Current;