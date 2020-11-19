import { ADD_LIKE } from "../actions/actionTypes";
const initialState = {
  likeCity: []
};

const likes = (state = initialState, action) => {
	switch (action.type) {
    case ADD_LIKE:
			let identityElement = []
			let newState = []
			if(state.likeCity.length > 0){
				state.likeCity.forEach(el=>{
					if(el.lat === action.payload.lat){
						identityElement.push(el)
					}
				})
			}
			if (identityElement.length === 0 && action.payload){
				
				newState = state.likeCity
				newState.push(action.payload)
				debugger
						let stringCity = JSON.stringify(newState)
						localStorage.setItem('likes', stringCity);
			}
			return {
				likeCity: newState
			}
    default:
      return state
  }
}

export default likes