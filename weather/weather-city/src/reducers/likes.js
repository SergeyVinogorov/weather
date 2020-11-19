import { ADD_LIKE } from "../actions/actionTypes";
const initialState = {
  likeCity: []
};

const likes = (state = initialState, action) => {
	switch (action.type) {
    case ADD_LIKE:
			let identityElement = []

			if(state.likeCity.length > 0 && action.payload){
				identityElement = state.likeCity.filter(el=>el.lat===action.payload.lat)
			}
			if (identityElement.length === 0 && action.payload){

				let newState = state.likeCity.concat([action.payload])
				let stringCity = JSON.stringify(newState)
				localStorage.setItem('likes', stringCity);
				return {
					...state,
					likeCity: newState
				}
			}
    default:
      return state
	}
}

export default likes