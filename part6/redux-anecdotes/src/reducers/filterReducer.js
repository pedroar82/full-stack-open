

const filterReducer = (state = '', action) => {
  console.log('filter state now: ', state.filter)
  console.log('filter action', action)
  switch (action.type) {
  case 'FILTER':
    return action.payload
  default:
    return state
  }
}

export const filterAnecdote = (content) => {
  return {
    type: 'FILTER',
    payload: content
  }
}

export default filterReducer