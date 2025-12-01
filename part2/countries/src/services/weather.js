import axios from 'axios'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const iconUrl = 'https://openweathermap.org/img/wn/'
const api_key = import.meta.env.VITE_SOME_KEY

const getCityWeather = ([lat,lon]) => {
  //used capital's latitude and longitude because the API doesn't support city names with a space character  
  const request = axios.get(`${weatherUrl}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
  return request.then(response => response.data)
}

export default { 
  getCityWeather,
  iconUrl
}