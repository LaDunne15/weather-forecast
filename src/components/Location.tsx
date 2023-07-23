import { useEffect, useState } from "react";

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
        <div>
            {location.country} - {location.region} - {location.name} | {location.localtime} | {location.lat} {location.lon}
            <a target="_blank" href={`https://www.google.com/maps?q=${location.lat},${location.lon}`}>Перейти</a>
        </div>
    )
}

export default Location;