import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Countries from './components/Countries'
import Country from './components/Country'

function App() {
  const [filterRes, setFilterRes] = useState([])
  const [countries, setCountries] = useState([])
  const [countryInfo, setcountryInfo] = useState(null)

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
    } else {
      const res = countries.filter(country => country.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0)
      if (res.length > 10) {
        setFilterRes(['Too many matches, specify another filter'])
        setcountryInfo(null)
      } else if (res.length === 1) {
        setFilterRes([])
        countriesService
          .getCountryInfo(res[0])
          .then(cInfo => {
            console.log(cInfo)
            setcountryInfo(cInfo)
          })
      } else {
        setcountryInfo(null)
        setFilterRes(res)
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
      })
  }

  return (
    <div>
      countries: <input onChange={searchCountry} />
      <Countries filteredCountries={filterRes} showCountry={showCountry} />
      <Country info={countryInfo} />
    </div>
  )
}

export default App
