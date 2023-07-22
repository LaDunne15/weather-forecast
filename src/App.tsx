import React, { useEffect, useState } from 'react';
import "./styles.css";
import BarChart from './charts/BarChart';
import MainForecast from './components/MainForecast';
import { useDispatch, useSelector } from 'react-redux';
import AppState from './intefaces/AppState';
import LocationData from './components/Location';

function App() {

  const API_KEY = '22bef7219d7b45ba923124205231907';
  const lang = 'uk';
  const days = 3;

  const areas = useSelector((state: AppState) => state.areas)
  const dispatch = useDispatch();

  const [isLoading, setIsLoadiong] = useState(false);
  const [location, setLocation] = useState(areas.size !== 0 ? Array.from(areas)[0] : "kiev");
  const [input, setInput] = useState("");
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
    },
    location: {
      name: "",
      region: "",
      country: "",
      lat: 0,
      lon: 0
    }
  });

  const [isError, setIsError] = useState(false);

  const deleteArea = (name: string) => {
    dispatch({ type: 'DELETE_AREA', payload: name });
  }

  const changeArea = (name: string) => {
    setLocation(name);
  }

  const fetchData = async (areaName: string) => {
    setIsError(false);
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
      console.log("ПОМИЛКА СПРАЦЮВАЛА")
      setIsError(true);
    }
  }

  useEffect(() => {
    if (location !== "")
    {
      fetchData(location);
    }
  }, [location]);

  return (
    <div>
      <input type="search" onChange={(e)=>setInput(e.target.value)}/>
      <input type="button" value="Запит" onClick={() => setLocation(input)} />
        {
          Array.from(areas).map((i,index) => (
            <div key={index}>
              <label className={location === i ? "border" : ""} onClick={() => changeArea(i)}>{i}</label>
              <input type="button" value="Видалити" onClick={() => deleteArea(i)}/>
            </div>
          ))
        }    
      {!isLoading && !isError && (
        <div>
          <LocationData data={data.location}/>
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
                ["temperature","wind", "chance_of_rain"].map((i, index) => (
                  <div key={index} onClick={() => setFocusMode(i)} className={i === focusMode ? "border" : ""}>{i}</div>
              ))}
            </div>
            <BarChart data={focusDay.hour} type={focusMode} />
          </div>
        </div>
      )}
      {
        isError && (
          <div>
            Помилка!
            Неправильно введене місто
          </div>
        )
      }
      {
        !isError && isLoading && (
          <div>
            Обробка запиту...
          </div>
        )
      }
    </div>
  );
}

export default App;
