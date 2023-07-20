import React, { useEffect, useState } from 'react';
import "./styles.css";
import BarChart from './charts/BarChart';
import MainForecast from './components/MainForecast';
import { useDispatch, useSelector } from 'react-redux';
import AppState from './intefaces/AppState';

function App() {

  const API_KEY = '22bef7219d7b45ba923124205231907';
  const lang = 'uk';
  const days = 3;

  const areas = useSelector((state: AppState) => state.areas)
  const dispatch = useDispatch();

  const [isLoading, setIsLoadiong] = useState(false);
  const [location, setLocation] = useState("brusnitsa");
  const [focusDay, setFocusDay] = useState({
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
  });
  const [focusMode, setFocusMode] = useState("temperature");
  const [data, setData] = useState({
    current: {
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
    },
    forecast: {
      forecastday: [{
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
      }]
    }
  });

  const deleteArea = (name: string) => {
    dispatch({type: 'DELETE_AREA', payload: name})
  }

  const loadData = () => {
    fetchData(location);
  }

  const changeArea = (name: string) => {
    setLocation(name);
    fetchData(name);
  }

  const fetchData = async (areaName: string) => {
    try {
      setIsLoadiong(true);
      const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${areaName}&lang=${lang}&days=${days}&key=${API_KEY}`);
      const json = await response.json();
      setData(json);
      setFocusDay(json.forecast.forecastday[0]);
      dispatch({type: 'ADD_AREA', payload: location})
      console.log(json);
      setIsLoadiong(false);
    } catch (error) {
      console.error('Помилка:',error)
    }
  }

  useEffect(() => {
    console.log("Нові дані",focusDay);
  }, [focusDay]);
  
  if (isLoading) {
    return <div>
      Завантаження...
    </div>
  }

  return (
    <div>
      <input type="text" onChange={(e)=>setLocation(e.target.value)} value={location}/>
      <input type="button" value="Запит" onClick={() => loadData()} />
        {
          Array.from(areas).map((i,index) => (
            <div className={location===i?"border":""} key={index} onClick={() => changeArea(i)}>
              {i}
              <input type="button" value="Видалити" onClick={() => deleteArea(i)}/>
            </div>
          ))
        }    
      {!isLoading && (
        <div>
          <MainForecast data={data.current} />
          <div>
            <h3>Прогноз на 3 дня:</h3>
            {
              data.forecast.forecastday.map((i, index) => (
                <div key={index} onClick={()=>setFocusDay(i)} className={i.date===focusDay.date?"border":""}>
                  <img src={i.day.condition.icon} alt={i.day.condition.text} />
                  <p>t: {i.day.mintemp_c}...{i.day.maxtemp_c}</p>
                  <p>{i.date}</p>
                </div>
              ))
            }
            <div>
              {
                ["temperature", "humidity", "wind"].map((i, index) => (
                  <div key={index} onClick={() => setFocusMode(i)} className={i === focusMode ? "border" : ""}>{i}</div>
              ))}
            </div>
            <BarChart data={focusDay.hour} type={focusMode} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
