import React from 'react';
import { Route, Redirect } from 'react-router-dom';

//Шэф я хз что это. В теоретической части на сайте сказали делать я делаю :D
const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    { 
      () => props.loggedIn ? <Component {...props} /> : <Redirect to="sign-in" />
    }
  </Route>
);

export default ProtectedRoute;