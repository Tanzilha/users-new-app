import { combineReducers } from 'redux'
import users from './users'
import gists from './gists'

const rootReducer = combineReducers({
    users,
    gists
})

export default rootReducer