import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'   ///////////////////
import Cookies from 'js-cookie'
import { Button,Input, Spin } from 'antd';
import { clone, map } from 'ramda';

import { addUser } from '../../actions/users'   ////////////////////////////
import { deleteUser } from '../../actions/users'
import { saveUser } from '../../actions/users'
 
export const Users = (props) => {

    const [credentials, setCredentials] = useState({})    
    const dispatch = useDispatch()    ///////////////////////////////
    const users = useSelector(state => { 
        console.log('State', state.users.users)
        return state.users.users
    })

    const isLoading = useSelector(state => state.users.isLoading)
    // Callback functions

    // const callback = state => state

    // useSelector(callback)

    useEffect(() => {
        console.log('Invoked')
        const isLoggedIn = Cookies.get('loggedIn') || false
        if(isLoggedIn === 'false' || !isLoggedIn){
            
            props.history.push('/')
        }
    }, []);

    const [form, setForm] = useState(false)

    const logoutHandler = () => {
        Cookies.set('loggedIn', false)
        props.history.push('/')
    }

    

    const changeHandler = (event) => {
        const user = clone(credentials)
        user[event.target.name] = event.target.value
        setCredentials(user)
    }

    const clickHandler = () => {
        const user = credentials
        dispatch(addUser(user))
    }

    const deleteHandler = (user) => {
        dispatch(deleteUser(user))
    }

    const editHandler = (user) =>{
        setCredentials(user)
        setForm(true)
    }

    const saveHandler = () => {
        const user = credentials
        dispatch(saveUser(user))
        setForm(false)
    }
    // const imageHandler = (event) => {
        
    //     }

    console.log('Login', Cookies.get('loggedIn'))

    return (
        <div>
            <Input type="text" name="username" value={credentials.username} placeholder="username" onChange={changeHandler} style={{ marginBottom: '10px' }} />
            <Input type="number" name="age" value={credentials.age} onChange={changeHandler} placeholder="age" style={{ marginBottom: '10px' }}  />
            {/* <Input type="file" name="myImage" onChange={imageHandler}/> */}
            <Button  type="primary" onClick={form? saveHandler : clickHandler} style={{margin: '0 auto', marginTop: '20px', marginRight: '20px' }}>{form ? "Udpate user" : "Add user"}</Button>
            <Button onClick={logoutHandler}>logout</Button>
            <Spin spinning={isLoading} tip="Loading...">
                <h3>Users:</h3>
                <ul>
                    {
                        map(user => {
                            return(
                                <li key={user.username}>{user.username}-{user.age}
                                <Button type="primary" onClick={() => deleteHandler(user)} style={{ marginLeft: '10px' }}>Delete</Button>
                                <Button type="primary" onClick={() => editHandler(user)} style={{ marginLeft: '10px' }}> Edit </Button>
                                </li>
                            )
                        }, users)
                    }
                </ul>
            </Spin>
        </div>
    )
}
