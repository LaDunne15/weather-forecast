import { useEffect, useState } from 'react';
import "./styles/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import AppState from './intefaces/AppState';
import Location from './components/location/Location';
import Areas from './components/areas/Areas';
import Forecast from './components/forecast/Forecast';
import Current from './components/current/Current';
const gif = require('./static/_location.gif');
const telegram_icon = require('./static/icons8-telegram-50.png');

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

  
  const API_KEY =`${process.env.REACT_APP_API_KEY}`;
  const lang = `${process.env.REACT_APP_LANG}`;
  const days = `${process.env.REACT_APP_DAYS}`;

  const fetchData = (areaName: string) => {
    setIsLoading(true);
    fetch(`https://api.weatherapi.com/v1/forecast.json?q=${areaName}&lang=${lang}&days=${days}&key=${API_KEY}`)
    .then((res) => {
      setIsError(false);
      if (res.ok) {
        const data = res.json();
        data.then(data=>{
          const locationName = data.location.name;
          dispatch({ type: 'ADD_AREA', payload: locationName });
        })
        return data;
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

  useEffect(() => {
    

    if (location)
    {fetchData(location)} 
    else 
    {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const string_coords : string = position.coords.latitude.toString().substring(0,5) +" "+ position.coords.longitude.toString().substring(0,5)
            fetchData(string_coords);
            dispatch({ type: 'FOCUS_AREA', payload: string_coords });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        fetchData("Kiev");
      }
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <header>
          Як там внизу <span className='logo'>погодка</span>?
      </header>
      <nav>
        <form>
          <span>Введіть назву пункту англійською або його координати:</span>
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
          <div className='main_content'>
              <div className='left_block'>
                <Location location={data.location}/>
                <Current current={data.current} />
              </div>
              <div className='right_block'>
                <Forecast forecast={data.forecast.forecastday}/>        
              </div>
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
        <div>
          <a href="https://t.me/magenta_human">
            <img src={telegram_icon} alt="magenta_human" /><span>©Osh</span>
          </a>
        </div>
        <p>2023</p>
      </footer>
    </>
  );
}

export default App;
