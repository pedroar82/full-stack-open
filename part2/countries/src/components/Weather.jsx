const Weather = ({ weather, iconUrl, country }) => {
    if (weather === null) {
        return null
    }
    return (
        <div >
            <h2>Weather in {country.capital}</h2>
            <p>Temperature {weather.main.temp} Celsius</p>
            <p>Description {weather.weather[0].description}</p>
            <img src={`${iconUrl}${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].main} />
            <p>Wind {weather.wind.speed} m/s</p>
        </div>
    )
}

export default Weather