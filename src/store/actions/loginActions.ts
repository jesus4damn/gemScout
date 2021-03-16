import {LOGOUT} from "../../constants/actionTypes";
import {AUTH} from "../../constants/sagasTypes";
import {IAuth} from "../../constants/types/interfaces/actionsInterfaces";
import {UserProfileAction} from "../../constants/types/types";

export const loginAction = (data: {mobile: string}): IAuth => {
    return {
        type: AUTH,
        path: '/auth/login/',
        data: data
    }
}

export const verifyAction = (data: {mobile: string, code: string}): IAuth => {
    return {
        type: AUTH,
        path: '/auth/verify/',
        data: data
    }
}

export const logoutAction = (): UserProfileAction => {
    return {
        type: LOGOUT
    }
}