import { append, clone, findIndex, indexOf, propEq, remove } from 'ramda'
import {
    USER_ADD_REQUEST,
    USER_ADD_SUCCESS,
    USER_ADD_FAILURE
} from '../actions/users'

import {
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAILURE
} from '../actions/users'

import {
    USER_SAVE_REQUEST,
    USER_SAVE_SUCCESS,
    USER_SAVE_FAILURE
} from '../actions/users'

const initState = {
    isLoading: false,  /// came form where
    users: [],
    error: ''  //////////////  ??
}

const users = (state=initState, action) => {      ////////which users    //// state => ??   ,action from actions folder
    const { type, payload } = action    //// types are 2

    switch(type){

        case USER_ADD_REQUEST:
            return {
                ...state,    /// ??
                isLoading: true 
            }

        case USER_ADD_SUCCESS:
            // const { users } = state  // or simply destructure users
            return {
                ...state,
                isLoading: false,
                users: append(payload, state.users) 
            }

         case USER_DELETE_REQUEST:
             return {
                 ...state, 
                 isLoading: true
             }
         case USER_DELETE_SUCCESS:
            const index = indexOf(payload, state.users)
              return {
                ...state,
                  isLoading: false,  
                  users: remove(index, 1, state.users)      
             }
         case USER_SAVE_REQUEST:
             return {
                  ...state,  
                  isLoading: true
             }  
         case USER_SAVE_SUCCESS:
             const indexs = findIndex(propEq('username',payload.username))(state.users)
             const updatedUsers = state.users
             updatedUsers[indexs] = payload
            return {
                ...state,   
                isLoading: false,
                users: updatedUsers
             }           
        default:  
            return {
                ...state
            }
    }

}
    
export default users