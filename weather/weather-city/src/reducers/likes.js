
const likes = (state, action) => {
  switch (action.type) {
    case 'ADD_LIKE_CITY':
      return action
    default:
      return state
  }
}

export default likes