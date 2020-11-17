let nextTodoId = 0
export const addCity = text => ({
  type: 'ADD_CITY',
  id: nextTodoId++,
  text
})

export const addLikeCity = filter => ({
  type: 'ADD_LIKE_CITY',
  filter
})

