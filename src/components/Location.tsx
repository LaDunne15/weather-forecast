function LocationData(data:any) {
    return (
        <div>
            {data.data.country} - {data.data.region} - {data.data.name} | {data.data.lat} {data.data.lon}
        </div>
    )
}

export default LocationData;