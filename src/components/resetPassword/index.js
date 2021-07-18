import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd';

export const Reset = () => {
    return (
        <div>
            Reset password!
            <Link to="/">
               <Button type="primary">Home page</Button>
            </Link>
        </div>
    )
}
