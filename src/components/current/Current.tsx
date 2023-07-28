import { useEffect, useState } from "react";
import "./current.css";
import ConditionIcon from "../condition_icon/ConditionIcon";

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

    const [toggleFrame,setToggleFrame] = useState(true);
    const focusClassName = toggleFrame?"left-half":"right-half";

    const changeFrame = () => {
      setToggleFrame(!toggleFrame);
    }

    useEffect(() => {
      const toggleState = () => setToggleFrame((prevState) => !prevState);
      const interval = setInterval(toggleState, 7000);
      return () => clearInterval(interval);
    }, []);

    const decodeWind = (direction: string): string => {
        switch (direction) {
          case "N":
            return "Північ";
          case "NNE":
            return "Північ-північ Схід";
          case "NE":
            return "Північний Схід";
          case "ENE":
            return "Схід-північ Схід";
          case "E":
            return "Схід";
          case "ESE":
            return "Схід-південь Схід";
          case "SE":
            return "Південний Схід";
          case "SSE":
            return "Південь-південь Схід";
          case "S":
            return "Південь";
          case "SSW":
            return "Південь-південь Захід";
          case "SW":
            return "Південний Захід";
          case "WSW":
            return "Захід-південь Захід";
          case "W":
            return "Захід";
          case "WNW":
            return "Захід-північ Захід";
          case "NW":
            return "Північний Захід";
          case "NNW":
            return "Північ-північ Захід";
          default:
            return "Невідомий напрямок вітру";
        }
    }

    useEffect(() => {
        setCurrent(data.current);
    },[data]);

    return (
        <div className="current-content">
            <div className={focusClassName}>
                <div onClick={changeFrame} className="first-frame">
                    <ConditionIcon condition={current.condition}/>
                    <div>
                        <span className="condition">{current.condition.text}</span>
                        <span className="temperature">{current.temp_c}°C</span>
                    </div>
                </div>    
                <div onClick={changeFrame} className="second-frame">
                    <div>
                        <span>Вологість:</span> {current.humidity} %
                    </div>
                    <div>
                        <span>Вітер:</span> {current.wind_kph} км/год <span>{decodeWind(current.wind_dir)}</span></div>
                    <div>
                        <span>Опади</span> {current.precip_mm} мм
                    </div>
                    <div>
                        <span>Хмарність:</span> {current.cloud} %
                    </div>
                    <div>
                        <span>Тиск:</span> {current.pressure_mb * 0.75} мм рт. ст.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Current;