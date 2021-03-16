import React from "react";
import {Route, Redirect} from "react-router-dom";
import {Component} from "../../constants/types/types";

interface IPrivateRouteProps {
    component: Component,
    path: string,
    exact?: boolean,
    redirect: string,
    access: boolean
}


const PrivateRoute = ({component: Component, access, redirect, ...rest}: IPrivateRouteProps) => {
    return (
        <Route {...rest} render={props => access
            ? <Component {...props}/>
            : <Redirect to={redirect}/>}
        />
    )
}

export default PrivateRoute;