
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

export { getTemperature, getHumidity, getWind };