const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')


const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('#weather-data')

// Funções
const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=pt_br`

  const res = await fetch(apiWeatherURL)
  const data = await res.json()

  return data
}


const showWeatherData = async (city) => {
  const data = await getWeatherData(city);
  console.log(data)

  cityElement.innerHTML = data.name;
  tempElement.innerHTML = parseInt(data.main.temp)
  descElement.innerHTML = data.weather[0].description
  console.log(data.sys.country)
  countryElement.setAttribute('src', `https://flagsapi.com/${data.sys.country}/shiny/64.png`)
  weatherIconElement.setAttribute(
    'src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  )
  console.log(weatherIconElement)
  console.log(data.weather[0].icon)
  humidityElement.innerHTML = `${data.main.humidity}%`;
  windElement.innerHTML = `${data.wind.speed}Km/h`

  weatherContainer.classList.remove('hide')
}


// Eventos
searchBtn.addEventListener('click', (e) => {
  e.preventDefault()

  const city = cityInput.value;

   showWeatherData(city);
})

cityInput.addEventListener('keyup', (e) => {

  if (e.code === 'Enter') {
    const city = e.target.value
    showWeatherData(city)
  }
})