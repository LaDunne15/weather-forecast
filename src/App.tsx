import { FormEvent, useEffect, useState } from 'react';
import "./styles/styles.css";
import { useDispatch, useSelector } from 'react-redux';
import AppState from './intefaces/AppState';
import Location from './components/location/Location';
import Areas from './components/areas/Areas';
import Forecast from './components/forecast/Forecast';
import Current from './components/current/Current';
import ErrorComponent from './components/errors/ErrorComponent';
import Loading from './components/loading/Loading';
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

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorData, setErrorData] = useState({error:{
    code:"",
    message:""
}});

  const changeArea = (name: string) => {
    dispatch({ type: 'FOCUS_AREA', payload: name });
  }

  
  const API_KEY =`${process.env.REACT_APP_API_KEY}`;
  const lang = `${process.env.REACT_APP_LANG}`;
  const days = `${process.env.REACT_APP_DAYS}`;

  const fetchData = (areaName: string) => {
    setIsLoading(true);
    setIsError(false);
    fetch(`https://api.weatherapi.com/v1/forecast.json?q=${areaName}&lang=${lang}&days=${days}&key=${API_KEY}`)
    .then((res) => {
      const data= res.json();
      if (res.ok) {
        data.then(data=>{
          const locationName = data.location.name;
          setData(data);
          dispatch({ type: 'ADD_AREA', payload: locationName });
          dispatch({ type: 'FOCUS_AREA', payload: locationName });
          setIsLoading(false);
        })
        return data;
      }
      else
      {
        data.then(data=>{
          setErrorData(data);
        });
        setIsError(true);
      }
    })
    .catch((error) => {
      setIsError(true);
      console.log("Помилка",error)
    });
  }


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions.query({name: "geolocation"}).then((result)=>{
        if(result.state ==="granted" || result.state ==="prompt"){
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const string_coords : string = position.coords.latitude.toString().substring(0,5) +" "+ position.coords.longitude.toString().substring(0,5)
              fetchData(string_coords);
            },
            (error) => {
              console.error('Error getting user location:', error);
            }
         );
        } else if (result.state ==="denied") {
          if(location) {
            fetchData(location);
          } else {
            fetchData("Kiev");
          }
        }
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
      fetchData("Kiev");
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(()=>{
    if(location) fetchData(location);
  },[location]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeArea(input);
  }

  return (
    <div className='app'>
      <header>
          Як там внизу <span className='logo'>погодка</span>?
      </header>
      <nav>
        <form onSubmit={handleSubmit}>
          <span>Введіть назву пункту англійською або його координати:</span>
          <div>
            <img className='location_gif' src={gif} alt="git_location"/>
            <input type="search" onChange={(e)=>{setInput(e.target.value)}}/>
            <input type="submit" value="Запит"/>
          </div>
        </form>
        <Areas/>
      </nav>
      <main>
        {
          !isError && isLoading && <Loading/>
        } 
        {
          isError && <ErrorComponent error={errorData}/>
        }
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
      <footer>
        <div>
          <a href="https://t.me/magenta_human">
            <img src={telegram_icon} alt="magenta_human" /><span>©Osh</span>
          </a>
        </div>
        <p>2023</p>
      </footer>
    </div>
  );
}

export default App;
