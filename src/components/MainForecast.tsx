function MainForecast(data: any) {
    return (<div>
        <h2>Поточний:</h2>            
            <img src={data.data.condition.icon} alt={data.data.condition.text} />
            <p>{data.data.condition.text}</p>
            <p>Температура: {data.data.temp_c} градусів Цельсія</p>
            <p>Вологість: {data.data.humidity} %</p>
            <p>Вітер: {data.data.wind_kph} км/год {data.data.wind_dir} ({data.data.wind_degree})</p>
            <p>Опади {data.data.precip_mm} мм</p>
            <p>Хмарність: {data.data.cloud} %</p>
            <p>Тиск: {data.data.pressure_mb * 0.75} мм рт. ст.</p>
            
        </div>
    )
}

export default MainForecast;