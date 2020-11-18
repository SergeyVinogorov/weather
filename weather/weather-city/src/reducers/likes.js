import { ADD_LIKE } from "../actions/actionTypes";
const initialState = {
  likeCity: []
};
const likes = (state = initialState, action) => {
  switch (action.type) {
    case ADD_LIKE:
			let newState = state.likeCity.concat(action.payload)
			let stringCity = JSON.stringify(newState)
  		localStorage.setItem('likes', stringCity);
      return {
				likeCity: newState
			}
    default:
      return state
  }
}

export default likes