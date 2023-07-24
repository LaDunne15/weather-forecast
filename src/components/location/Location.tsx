import { useEffect, useState } from "react";
import "./location.css";

function Location(data: any) {
    
    const [location,setLocation] = useState({
      name: "",
      region: "",
      country: "",
      lat: 0,
      lon: 0,
      localtime: ""
    });

    useEffect(() => {
        setLocation(data.location);
    }, [data]);

    return (
        <div className="location">
            <div className="address">
                <h6 className="location-reload">Оновлено {location.localtime}</h6>
                <h1 className="location-name">{location.name}</h1>
                <h1>{location.region}, {location.country}</h1>
            </div>
            <div className="coordinates">
                <span>{location.lat}°</span>
                <span>{location.lon}°</span>
                <a className="coordinates-link" target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps?q=${location.lat},${location.lon}`}>на мапі</a>
            </div>
        </div>
    )
}

export default Location;