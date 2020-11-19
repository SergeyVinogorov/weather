import { weather } from './baseApi'
import { API_WEATHER_KEY } from '../constants'

export async function getWeather(params){
	const response = await weather.get(`?lat=${params.lat}&lon=${params.lon}&appid=${API_WEATHER_KEY}`)
  return response.data
}