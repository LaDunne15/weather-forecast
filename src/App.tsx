import { useEffect, useState } from 'react';
import "./styles/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import AppState from './intefaces/AppState';
import Location from './components/location/Location';
import Areas from './components/areas/Areas';
import Forecast from './components/forecast/Forecast';
import Current from './components/current/Current';
const gif = require('./static/_location.gif');

function App() {

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

  useEffect(() => {
    const API_KEY =`${process.env.REACT_APP_API_KEY}`;
    const lang = `${process.env.REACT_APP_LANG}`;
    const days = `${process.env.REACT_APP_DAYS}`;
    const fetchData = (areaName: string) => {
    setIsLoading(true);
    fetch(`https://api.weatherapi.com/v1/forecast.json?q=${areaName}&lang=${lang}&days=${days}&key=${API_KEY}`)
    .then((res) => {
      setIsError(false);
      if (res.ok) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
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

    if (location) fetchData(location);
    
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <header>
          Як там внизу <span className='logo'>погодка</span>?
      </header>
      <nav>
        <form>
          <span>Введіть бажаний пункт (англійською)</span>
          <div>
            <img className='location_gif' src={gif} alt="git_location"/>
            <input type="search" onChange={(e)=>setInput(e.target.value)}/>
            <input type="button" value="Запит" onClick={() => changeArea(input)} />
          </div>
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
      <footer>
        osh
        2023
      </footer>
    </>
  );
}

export default App;
