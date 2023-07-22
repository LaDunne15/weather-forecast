
const getTemperature = (data: any) => {
    return data.map((i:any) => {
        return {
            time: i.time.slice(-5),
            value: i.temp_c
        };
    });
}

const getHumidity = (data: any) => {
    return data.map((i:any) => {
        return {
            time: i.time.slice(-5),
            value: i.humidity
        };
    });
}

const getWind = (data: any) => {
    return data.map((i:any) => {
        return {
            time: i.time.slice(-5),
            value: i.wind_kph
        };
    });
}


const getChance_of_rain = (data: any) => {
    return data.map((i:any) => {
        return {
            time: i.time.slice(-5),
            value: i.chance_of_rain
        };
    });
}

export { getTemperature, getHumidity, getWind, getChance_of_rain };