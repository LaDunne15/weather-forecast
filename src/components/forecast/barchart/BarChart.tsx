import { useEffect, useState } from "react";
import { getTemperature, getHumidity, getWind, getChance_of_rain } from "../../../service/getData";
import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, Label, YAxis, Legend } from 'recharts';

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
            case "chance_of_rain":
                setChartData(getChance_of_rain(props.data));
                break;
            default:
                break;
        }
    }
    ,[props]);

    const data = [
        {
          name: "Page A",
          uv: 4000,
          pv: 2400,
          amt: 2400
        },
        {
          name: "Page B",
          uv: 3000,
          pv: 1398,
          amt: 2210
        },
        {
          name: "Page C",
          uv: 2000,
          pv: 9800,
          amt: 2290
        },
        {
          name: "Page D",
          uv: 2780,
          pv: 3908,
          amt: 2000
        },
        {
          name: "Page E",
          uv: 1890,
          pv: 4800,
          amt: 2181
        },
        {
          name: "Page F",
          uv: 2390,
          pv: 3800,
          amt: 2500
        },
        {
          name: "Page G",
          uv: 3490,
          pv: 4300,
          amt: 2100
        }
      ];
    
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