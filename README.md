# edirect_coding_challenge

```
For backend:

// install dependencies
npm i

// migration of tables
npx sequelize db:migrate

// running the backend server
npm start


For frontend:

// install dependencies
npm i

// running the frontend server
npm start



Since it is used in mysql setup, so please change the credentials in "backend/config/config.json" with database name username and password too.
Also create a database named "project_manager" by logging into mysql shell.

One more thing for local development we need to open the chrome in insecure mode by below commands::
google-chrome --disable-web-security --user-data-dir="~/teste/"
```

for protected routes use the below code for a component::

```
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
```

In the Route.js file I have added the private routes as::


```
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/private-route/PrivateRoute';

 <BrowserRouter>
            <Fragment>
                <Navbar />
                <Switch>
                    <Route path="/" exact component={Signup} />
                    <Route path="/signin" exact component={Signin} />
                    <PrivateRoute path="/projects" exact  component={Projects} />
                    <PrivateRoute path="/edit/project/:projectId" exact component={EditProject} />
                    <PrivateRoute path="/project/:projectId/tasks" exact  component={Tasks} />
                    <PrivateRoute path="/project/:projectId/update/task/:taskId" exact component={EditTask} />
                </Switch>
            </Fragment>
        </BrowserRouter>
```

And the most important function(helpers) that is checking for token and
expiry of token::

```
export const checkTokenExpiration = () => {
    try {
        if (typeof window == 'undefined') {
            return false;
        }
        if (localStorage.getItem("jwt")) {
            let token = JSON.parse(localStorage.getItem("jwt"));
            let decoded = jwtoken.verify(token, process.env.REACT_APP_JWT_SECRET);
            return decoded;
        } else {
            return false;
        }
        
    } catch (error) {
        // this removal of jwt token is very important in respect of redirect to /signin page
        localStorage.removeItem("jwt");
        return false;
    }
};
```
