/// <reference types="react" />
import { Component } from "../../constants/types/types";
interface IPrivateRouteProps {
    component: Component;
    path: string;
    exact?: boolean;
    redirect: string;
    access: boolean;
}
declare const PrivateRoute: ({ component: Component, access, redirect, ...rest }: IPrivateRouteProps) => JSX.Element;
export default PrivateRoute;
