import React from 'react'
import { Switch, Route, withRouter} from 'react-router-dom'
import { Login } from './login'
import { Reset } from './resetPassword'
import { Users } from './users'
// import { Gists } from './Gists'

const Routes = () => {
    return (
        <div>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/users" component={Users} />
            <Route path="/reset" component={Reset} />
        </Switch>

        {/* <Link to="/reset">
            <Button type="primary">Reset Password</Button>
        </Link> */}

        </div>
    )
}
export default withRouter(Routes)

