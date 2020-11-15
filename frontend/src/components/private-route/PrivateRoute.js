import React from 'react';
import { Redirect, Route } from 'react-router-dom';


import {isAuthenticated, checkTokenExpiration} from "../../helpers";

//private route for checking whether user is logged in and token is verified
// expired token and user is redirected to /signin route.
// checkTokenExpiration() is very important as in catch block token is removed
// and catch block called when jwt.verify fails.
const PrivateRoute = ({ component: Component, ...rest }) => {
    const token = isAuthenticated();
    const decode = checkTokenExpiration();
    return (
      <Route
        {...rest}
        render={(props) => 
        token && !!decode ? (
             <Component {...props} />
          ) : (
            <Redirect
              to="/signin"
            />
          )
        }
      />
    );
  }

  export default PrivateRoute;