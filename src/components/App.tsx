import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import PrivateRoute from "../common/components/PrivateRoute";
import MainPageWrapper from "./MainPageWrapper";
import {connect, ConnectedProps} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import Login from "./login_page/Login";
import {API} from "../constants/api/api";

const connector = connect(
    (state: RootState) => ({
        isLogin: state.userProfile.isLogin,
        token: state.userProfile.token
    })
)

const App: React.FC<any> = ({isLogin, token}: ConnectedProps<typeof connector>) => {

    if (!API.config.headers['Authorization'] && token) API.setAuthHeader(token);

    return (
        <div>
            <Switch>
                <PrivateRoute
                    exact={true}
                    path="/login"
                    component={Login}
                    redirect="/"
                    access={!isLogin}
                />
                <PrivateRoute
                    path="/"
                    component={MainPageWrapper}
                    redirect="/login"
                    access={isLogin}
                />
                <Route render={() => isLogin ? <Redirect to="/" /> : <Redirect to="/login" />} />
            </Switch>
        </div>
    )
}

export default connector(App);