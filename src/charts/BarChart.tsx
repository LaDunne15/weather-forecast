import { useEffect, useState } from "react";
import { getTemperature, getHumidity, getWind } from "../service/getData";
import { BarChart as BC, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

function BarChart(props: any) {

    const [chartData,setChartData] = useState([]);


    useEffect(() => {
        switch (props.type) {
            case "temperature":
                setChartData(getTemperature(props.data));
                break;
            case "humidity":
                setChartData(getHumidity(props.data));
                break;
            case "wind":
                setChartData(getWind(props.data));
                break;
            default:
                break;
        }
    }
    ,[props]);

    return (
        <BC width={300} height={150} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time">
                <Label value={props.type} offset={0} position="insideBottom" />
            </XAxis>
            <YAxis/>
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
        </BC>
    )
}

export default BarChart;