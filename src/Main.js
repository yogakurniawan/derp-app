import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from 'containers/Home'
import Login from 'containers/Login'
import { loadItem } from 'utils/localStorage'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      const userData = loadItem('userData')
      return userData ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }}/>
    }}
  />
);

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
const Main = () => (
  <main>
    <Switch>
      <PrivateRoute exact path='/' component={Home}/>
      <Route exact path='/login' component={Login}/>
    </Switch>
  </main>
)

export default Main
