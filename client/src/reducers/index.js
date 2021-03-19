import { combineReducers } from 'redux'
import listReducer from './listReducer'
import stateReducer from './stateReducer'


export default combineReducers({
    list: listReducer,
    state: stateReducer,
})