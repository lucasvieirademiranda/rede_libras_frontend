import React from "react";
import moment from 'moment';

import { Container } from 'react-materialize';

import { Switch, Route, Redirect } from 'react-router-dom';

import Category from '../pages/category';
import CategoryForm from '../pages/categoryForm';
import CategoryView from '../pages/categoryView';
import Home from "../pages/home";
import System from "../pages/system";
import Login from "../pages/login";
import User from "../pages/user";
import UserForm from "../pages/userForm";
import UserView from '../pages/userView';
import Sign from '../pages/sign';
import SignForm from '../pages/signForm';
import SignView from '../pages/signView';

function PrivateRoute ({component: Component, ...rest})
{
    var token = localStorage.getItem('fcm_token');
    var tokenBirth = localStorage.getItem('fcm_token_birth');

    var currentTime = moment();
    var previousTime = moment(tokenBirth);

    var elapsedTime = moment.duration(currentTime.diff(previousTime));

    if (token && elapsedTime._data.minutes < 15)
    {
        return (<Route {...rest} render={ (props) => <Component {...props} /> }  />);
    }
    else
    {
        return (<Route {...rest} render={ (props) => <Redirect to={ { pathname: '/login', state: {from: props.location} } } />} />);
    }

}

const Main = () => (
    <main>
        <Container>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <PrivateRoute exact path='/system' component={System} />
                <PrivateRoute exact path='/categories' component={Category} />
                <PrivateRoute exact path='/categories/add' component={CategoryForm} />
                <PrivateRoute exact path='/categories/edit/:id' component={CategoryForm} />
                <PrivateRoute exact path='/categories/delete/:id' component={CategoryView} />
                <PrivateRoute exact path="/users" component={User} />
                <PrivateRoute exact path='/users/add' component={UserForm} />
                <PrivateRoute exact path='/users/edit/:id' component={UserForm} />
                <PrivateRoute exact path='/users/delete/:id' component={UserView} />
                <PrivateRoute exact path='/signs' component={Sign} />
                <PrivateRoute exact path='/signs/add' component={SignForm} />
                <PrivateRoute exact path='/signs/edit/:id' component={SignForm} />
                <PrivateRoute exact path='/signs/delete/:id' component={SignView} />
            </Switch>
        </Container>
    </main>
);

export default Main