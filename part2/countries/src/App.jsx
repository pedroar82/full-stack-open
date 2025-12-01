import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'
import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'

function App() {
  const [filterRes, setFilterRes] = useState([])
  const [countries, setCountries] = useState([])
  const [countryInfo, setcountryInfo] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(intialCountries => {
        setCountries(intialCountries.map(country => country.name.common))
      })
  }, [])

  const searchCountry = event => {
    //reset all values if no input is detected
    if (event.target.value == '') {
      setcountryInfo(null)
      setFilterRes([])
      setWeather(null)
    } else {
      const res = countries.filter(country => country.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0)
      if (res.length > 10) {
        setFilterRes(['Too many matches, specify another filter'])
        setcountryInfo(null)
        setWeather(null)
      } else if (res.length === 1) {
        setFilterRes([])
        setWeather(null)
        countriesService
          .getCountryInfo(res[0])
          .then(cInfo => {
            setcountryInfo(cInfo)
            weatherService
              .getCityWeather(cInfo.latlng)
              .then(wInfo => {
                setWeather(wInfo)
              })
          })
      } else {
        setcountryInfo(null)
        setFilterRes(res)
        setWeather(null)
      }
    }
  }

  //handle the click in button show
  //gets the info for the country clicked
  const showCountry = (cName) => {
    countriesService
      .getCountryInfo(cName)
      .then(cInfo => {
        setcountryInfo(cInfo)
        weatherService
          .getCityWeather(cInfo.latlng)
          .then(wInfo => {
            setWeather(wInfo)
          })
      })
  }

  return (
    <div>
      countries: <input onChange={searchCountry} />
      <Countries filteredCountries={filterRes} showCountry={showCountry} />
      <Country info={countryInfo} />
      <Weather weather={weather}
        iconUrl={weatherService.iconUrl}
        country={countryInfo} />
    </div>
  )
}

export default App
