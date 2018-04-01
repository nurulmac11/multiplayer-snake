
const _todos = [
  {
      id: 0,
      text: "example",
      completed: false
  },
  {
      id: 1,
      text: "example2",
      completed: false
  }
]

const todos = (state = _todos, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
            id: state[state.length-1].id+1,
            text: action.text,
            completed: false
        }
      ]
    default:
      return state
  }
}

export default todos