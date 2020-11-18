import { ADD_CITY } from "../actions/actionTypes";

const initialState = {
  selectedCity: []
};
const cities = (state = initialState, action) => {
		debugger

  switch (action.type) {
    case ADD_CITY:
      return {
				selectedCity: action.payload
			}
    default:
      return state
  }
}

export default cities