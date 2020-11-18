import { combineReducers } from 'redux'
import likes from './likes'
import cities from './cities'

export default combineReducers({
  likes,
  cities
})