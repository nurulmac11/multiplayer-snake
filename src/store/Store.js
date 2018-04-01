import { combineReducers } from 'redux'
import todos from './Reducers'

const storeApp = combineReducers({
  todos
})

export default storeApp
