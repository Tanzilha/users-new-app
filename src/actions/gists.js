import { clone } from 'ramda'
import { GIST_API_URL as url, token } from '../constants/urls'

export const FETCH_GISTS_REQUST = 'FETCH_GISTS_REQUST'
export const FETCH_GISTS_SUCCESS = 'FETCH_GISTS_SUCCESS'
export const FETCH_GISTS_FAILURE = 'FETCH_GISTS_FAILURE'
export const ADD_GISTS_REQUST = 'ADD_GISTS_REQUST'
export const ADD_GISTS_SUCCESS = 'ADD_GISTS_SUCCESS'
export const ADD_GISTS_FAILURE = 'ADD_GISTS_FAILURE'
export const DEL_GISTS_REQUST = 'DEL_GISTS_REQUST'
export const DEL_GISTS_SUCCESS = 'DEL_GISTS_SUCCESS'
export const DEL_GISTS_FAILURE = 'DEL_GISTS_FAILURE'
export const SAVE_GISTS_REQUST = 'SAVE_GISTS_REQUST'
export const SAVE_GISTS_SUCCESS = 'SAVE_GISTS_SUCCESS'
export const SAVE_GISTS_FAILURE = 'SAVE_GISTS_FAILURE'
export const UPDATE_GISTS_REQUST = 'UPDATE_GISTS_REQUST'
export const UPDATE_GISTS_SUCCESS = 'UPDATE_GISTS_SUCCESS'
export const UPDATE_GISTS_FAILURE = 'UPDATE_GISTS_FAILURE'

export const fetchGists = () => dispatch => {

    dispatch({ type: FETCH_GISTS_REQUST })

    fetch(`${url}/gists?${token}`)
    .then(res => {
        return res.json()
    })
    .then(response => {
        console.log('response', response)
        dispatch({
            type: FETCH_GISTS_SUCCESS,
            payload: response
        })
    })
    .catch(err => {
        console.log('Error', err)
    })

}

// files: {
//     'abc.text': {
//         content: 'Test'
//     }
// }

export const addGist = (values) =>  dispatch => {

    // console.log('Values', values)

    const formValues = {  files: {} }
    formValues.description = values.title
    formValues.files[values.fileName] = {  /// key(file name) in the object can be changed so acceseed in index form 
        content: values.content
    }  

    // console.log('Form', formValues)

    dispatch({ type: ADD_GISTS_REQUST })   //////   to send data to redux store

    fetch(`${url}/gists`, {
        header: {
            authorization: token
        },
        method: 'POST',
        body: JSON.stringify(formValues)
    })
    .then(res => {
        return res.json()
    })
    .then(response => {
        const { id, url, files } = response
        dispatch({
            type: ADD_GISTS_SUCCESS,
            payload: { id, url, files }    ///////     payload stores data 
        }) 
    })

 

}

export const delGist = (gist) => dispatch =>{
   console.log("del gist",gist)
    dispatch({ type: DEL_GISTS_REQUST })

    fetch(`${url}/gists/${gist.id}`, {
        method: 'DELETE',
        header: {
            authorization: token
        }
    })
    // .then(res => res.json())
    .then(response => {
        dispatch({
            type: DEL_GISTS_SUCCESS,
            payload: gist                                           
        })
    })
    .catch(err => {
        console.log('Error', err)
    })
}


export const updateGist = (gist) => dispatch =>{
//    console.log("update gist",gist)
    dispatch({ type: UPDATE_GISTS_REQUST })

    fetch(`${url}/gists/${gist.id}`, {
        method: 'GET',
        header: {
            authorization: token
        }
    })
    .then(res => res.json())
    .then(response => {
        console.log('Response', response)
        dispatch({
            type: UPDATE_GISTS_SUCCESS,
            payload: response                                           
        })
    })
    
}





export const saveGist = (values) => dispatch =>{
    // const formValues = {  files: {} }
    // formValues.description = values.title
    // formValues.files[values.fileName] = {  
    //     content: values.content
    // } 
    console.log("save gist in actions",values)
    console.log("id in actions", values.id)
     dispatch({ type: SAVE_GISTS_REQUST })
 
     fetch(`${url}/gists/${values.id}`, {
         method: 'PUT',
         header: {
            authorization: token
        },
        //  headers:{
        //      'Accept':'application/json',
        //      'content-type' : 'application/json'
        //  },
         body: JSON.stringify(values),
     })
     .then(res => res.json())
     .then(response => {
        //  console.log("edit response",response)
         dispatch({
             type: SAVE_GISTS_SUCCESS,
             payload: values
         })
     })
     
 }

// const a = b+c
// const d = a+f