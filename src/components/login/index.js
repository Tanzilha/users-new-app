import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {clone, map, find, propEq, append} from 'ramda'
import Cookies from 'js-cookie'
import { message, Button, Input } from 'antd';
import { users } from '../../constants/users'


export const Login = (props) => {

    const [credentials, setCredentials] = useState({})

    useEffect(() => {
        const isLoggedIn = Cookies.get('loggedIn') || false
        if(isLoggedIn === 'true'){
            props.history.push('/users')
        }
    }, [])

    const changeHandler = (event) => {
        const newLogin = clone(credentials)
        newLogin[event.target.name] = event.target.value
        setCredentials(newLogin)
    }

    const loginHandler = () => {
        const user = find(propEq('username', credentials.username))(users)
        if(user){
            if(user.password === credentials.password){
                Cookies.set('loggedIn', true)
                props.history.push("/users")
            }else{
                message.error('Invalid Password');
            }
        }else{
            message.error('404: User not Found.');
        }
        // if(index === true){
        //     props.history.push("/users")
        // }else{
        //     message.error('wrong username or password');
        // }

    }

    // const signUpHandler = () => {
    //     console.log(credentials)
    //     const user = clone(credentials)
    //     const userArray = clone(users)
    //     const newUser = append(user, userArray)
    //     setCredentials(newUser)
    //     console.log(newUser)
    // }


      const usernames = credentials.username
      const passwords = credentials.password


    return (
        <div style={{ width: '75%', margin: '0 auto', marginTop: '20px' }}>
            <Input type="text" name="username" value={credentials.username} onChange={changeHandler} style={{ marginBottom: '10px' }} />
            <Input type="text" name="password" value={credentials.password} onChange={changeHandler} style={{ marginBottom: '10px' }}  />
            <Button type="primary" onClick={loginHandler} style={{margin: '0 auto', marginTop: '20px', marginRight: '20px' }}>Login</Button>
            <Link to="/reset">
               <Button type="primary">Reset Password</Button>
            </Link>
            {/* <Button type="primary" onClick={() => signUpHandler(credentials)} >sign up</Button> */}


        </div>
    )
}
