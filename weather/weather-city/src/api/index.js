import { CITY_API_URL } from '../constants'
import { WEATHER_API_URL } from '../constants'
import axios from 'axios'

export const city = axios.create({
  baseURL: CITY_API_URL,
  responseType: 'json',
})

export const weather = axios.create({
  baseURL: WEATHER_API_URL,
  responseType: 'json',
})