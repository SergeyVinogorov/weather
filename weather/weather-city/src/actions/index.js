import { ADD_CITY, ADD_LIKE } from "./actionTypes";

export const addCity = city => ({
  type: ADD_CITY,
	payload: city
})

export const addLikeCity = city => ({
  type: ADD_LIKE,
  payload: city
})

