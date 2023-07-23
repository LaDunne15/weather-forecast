import React, { useEffect, useState } from 'react';
import "./styles.css";
import { useDispatch, useSelector } from 'react-redux';
import AppState from './intefaces/AppState';
import Location from './components/Location';
import Areas from './components/Areas';
import Forecast from './components/Forecast';
import Current from './components/Current';

function App() {

  const API_KEY = '22bef7219d7b45ba923124205231907';
  const lang = 'uk';
  const days = 3;

  const location = useSelector((state: AppState) => state.location);
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [data, setData] = useState({
    current: [],
    forecast: {
      forecastday: []
    },
    location: []
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const changeArea = (name: string) => {
    dispatch({ type: 'FOCUS_AREA', payload: name });
  }

  const fetchData = (areaName: string) => {
    setIsLoading(true);
    fetch(`https://api.weatherapi.com/v1/forecast.json?q=${areaName}&lang=${lang}&days=${days}&key=${API_KEY}`)
    .then((res) => {
      setIsError(false);
      if (res.ok) {
        dispatch({ type: 'ADD_AREA', payload: location });
        return res.json();
      }
      else
      {
        setIsError(true);
      }
    })
    .then((responseJson) => {
      setData(responseJson);
      setIsLoading(false);  
    })
    .catch((error) => {
      setIsError(true);
      console.log("Помилка",error)
    });
  }

  useEffect( () => {
    if (location) fetchData(location);
  }, [location]);

  return (
    <>
      <header>Як там внизу погодка?</header>
      <nav>
        <form>
          <input type="search" onChange={(e)=>setInput(e.target.value)}/>
          <input type="button" value="Запит" onClick={() => changeArea(input)} />
        </form>
        <Areas/>
      </nav>
      <main>
        {!isLoading && !isError && (
          <div>
              <Location location={data.location}/>
              <Current current={data.current} />
              <Forecast forecast={data.forecast.forecastday}/>        
          </div>
        )}
      </main>
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
      <footer>@Vlad</footer>
    </>
  );
}

export default App;
