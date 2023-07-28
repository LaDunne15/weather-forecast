import { useEffect, useState } from "react";
import "./conditionIcon.css";
const sun = require("../../static/weather-icons/icons8-sun.svg");
const partlyCloudyDay = require("../../static/weather-icons/icons8-partly-cloudy-day-48.png");


function ConditionIcon(param: any) {

    const [condition, setCondition] = useState({
        text: "",
        icon: "",
        code: ""
    });

    function getIconCaption(code: number): string {
        switch (code) {
            case 1000:
            return sun;
            case 1003:
            return partlyCloudyDay;
            case 1006:case 1009:case 1030:case 1135:case 1147:
            return "Cloud";
            case 1063:case 1180:case 1183:case 1186:case 1189:case 1192:
            case 1195:case 1240:case 1243:case 1246:case 1273:case 1276:
            return "Rain";
            case 1066:case 1114:case 1117:case 1210:case 1213:case 1216:case 1219:
            case 1222:case 1225:case 1255:case 1258:case 1279:case 1282:
            return "Snow";
            case 1069:case 1201:case 1204:case 1207:case 1249:case 1252:case 1261:case 1264:
            return "Sleet";
            case 1087:
            return "Storm";
            default:
            return "Unknown";
        }
    }

    const [img,setImg] = useState("");


    useEffect(()=>{
        setCondition(param.condition);
        setImg(condition.code);
    },[condition]);

    return (
        <img src={condition.icon} alt={condition.code}/>
    );
}

export default ConditionIcon;