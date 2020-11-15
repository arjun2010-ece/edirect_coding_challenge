import React, { Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Projects from './components/Projects';
import EditProject from './components/EditProject';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import EditTask from './components/EditTask';
import PrivateRoute from './components/private-route/PrivateRoute';


const Routes = () => {
    return (
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
    );
};

export default Routes;