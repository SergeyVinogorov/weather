import { ADD_LIKE } from "../actions/actionTypes";
const initialState = {
  likeCity: []
};
const likes = (state = initialState, action) => {
	debugger
	switch (action.type) {
    case ADD_LIKE:
			let identityElement = state.likeCity.length > 0 ? state.likeCity.filter(like => like.lat === action.payload.lat) : 0
				if (identityElement.length === 0){
					let newState = state.likeCity.concat(action.payload)
						let stringCity = JSON.stringify(newState)
						localStorage.setItem('likes', stringCity);
					return {
						likeCity: newState
					}
				}
			
			return state

    default:
      return state
  }
}

export default likes