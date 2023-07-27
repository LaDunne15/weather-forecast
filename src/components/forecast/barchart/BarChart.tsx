import { useEffect, useState } from "react";
import { getTemperature, getHumidity, getWind, getChance_of_rain } from "../../../service/getData";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, Label} from 'recharts';

function BarChart(props: any) {

    const [chartData,setChartData] = useState([]);


    useEffect(() => {
        switch (props.type) {
            case "температура":
                setChartData(getTemperature(props.data));
                break;
            case "вологість":
                setChartData(getHumidity(props.data));
                break;
            case "вітер":
                setChartData(getWind(props.data));
                break;
            case "ймовірність опадів":
                setChartData(getChance_of_rain(props.data));
                break;
            default:
                break;
        }
    }
    ,[props]);
    
   return (
    <ResponsiveContainer width="100%" height={150}>
        <LineChart width={300} height={100} data={chartData}>
            <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
            <XAxis dataKey="time">
                <Label value={props.type} offset={0} position="insideBottomLeft" />
            </XAxis>     
            <Tooltip/>
        </LineChart>
    </ResponsiveContainer>
   )
}

export default BarChart;