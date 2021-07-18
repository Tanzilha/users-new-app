export const USER_ADD_REQUEST = 'USER_ADD_REQUEST'  
export const USER_ADD_SUCCESS = 'USER_ADD_SUCCESS'    //// fixed names
export const USER_ADD_FAILURE = 'USER_ADD_FAILURE'  

export const addUser = (values) =>  dispatch => {

    dispatch({ type: USER_ADD_REQUEST })   //////   to send data to redux store

    dispatch({
        type: USER_ADD_SUCCESS,
        payload: values    ///////     payload stores data 
    })  

}
export const USER_DELETE_REQUEST = 'USER_DELETE_REQUEST'  
export const USER_DELETE_SUCCESS = 'USER_DELETE_SUCCESS'   
export const USER_DELETE_FAILURE = 'USER_DELETE_FAILURE' 

export const deleteUser = (values) =>  dispatch => {

    dispatch({ type: USER_DELETE_REQUEST })  

    dispatch({
        type: USER_DELETE_SUCCESS,
        payload: values  
    })  

}

export const USER_SAVE_REQUEST = 'USER_SAVE_REQUEST'  
export const USER_SAVE_SUCCESS = 'USER_SAVE_SUCCESS'   
export const USER_SAVE_FAILURE = 'USER_SAVE_FAILURE' 

export const saveUser = (values) =>  dispatch => {

    dispatch({ type: USER_SAVE_REQUEST }) 

    dispatch({
        type: USER_SAVE_SUCCESS,
        payload: values  
    })  

}