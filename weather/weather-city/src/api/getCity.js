import { city } from './baseApi'
import { API_KEY } from '../constants'

export async function getCity(params){
	const response = await city.get(`?q=${params}&key=${API_KEY}`)
  return response.data
}