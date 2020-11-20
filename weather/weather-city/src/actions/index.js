import { ADD_CITY, ADD_LIKE, DELETE_LIKE } from './actionTypes'

export const addCity = city => ({
  type: ADD_CITY,
	payload: city
})

export const addLikeCity = city => ({
  type: ADD_LIKE,
  payload: city
})
export const deleteLikeCity = (deleteLike) => ({
    type: DELETE_LIKE,
    payload: deleteLike,
})

