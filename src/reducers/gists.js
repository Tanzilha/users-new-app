
import {
    FETCH_GISTS_REQUST,
    FETCH_GISTS_SUCCESS,
    FETCH_GISTS_FAILURE,
    ADD_GISTS_REQUST,
    ADD_GISTS_SUCCESS,
    ADD_GISTS_FAILURE,
    DEL_GISTS_REQUST,
    DEL_GISTS_SUCCESS,
    DEL_GISTS_FAILURE,
    SAVE_GISTS_REQUST,
    SAVE_GISTS_SUCCESS,
    SAVE_GISTS_FAILURE,
    UPDATE_GISTS_REQUST,
    UPDATE_GISTS_SUCCESS,
    UPDATE_GISTS_FAILURE

} from '../actions/gists'
import {append, findIndex, indexOf, propEq, remove} from 'ramda'

const initState = {
    isLoading: false,  
    gists: [],
    gist:{},
    error: ''  
}

const gists = (state=initState, action) => {    
    const { type, payload } = action    

    switch(type){

        case FETCH_GISTS_REQUST:
            return {
                ...state,  
                isLoading: true
            }

        case FETCH_GISTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                gists: payload
            }
            case ADD_GISTS_REQUST:
                return {
                    ...state,
                    isLoading: true,
                }
                case ADD_GISTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                gists: append(payload, state.gists) 
            }
            case DEL_GISTS_REQUST:
                return {
                    ...state,
                    isLoading: true,
                }
                case DEL_GISTS_SUCCESS:
                    const index = indexOf(payload, state.gists)
            return {
                ...state,
                isLoading: false,
                gists: remove(index, 1, state.gists) 
            }
            case UPDATE_GISTS_REQUST:
                return {
                    ...state,
                    isLoading: true,
                }
                case UPDATE_GISTS_SUCCESS:
                    console.log("payload id",payload.id)
            return {
                ...state,
                isLoading: false,
                gist: payload 
            }
            case SAVE_GISTS_REQUST:
                return {
                    ...state,
                    isLoading: true,
                }
                case SAVE_GISTS_SUCCESS:
                    const indexs = findIndex(propEq('id',payload.id))(state.gists)
             const updatedGists = state.gists
             updatedGists[indexs] = payload
            return {
                ...state,
                isLoading: false,
                gists: updatedGists
            }
         
        default:  
            return {
                ...state
            }
    }

}

    
export default gists