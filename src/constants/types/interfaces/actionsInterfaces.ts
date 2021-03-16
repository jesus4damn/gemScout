import { UPDATE_USER_DATA } from "../../actionTypes";
import {AUTH, BASE_GET_REQUEST, BASE_POST_REQUEST, BASE_PUT_REQUEST, FILTER_LIST, BASE_DELETE_REQUEST, UPDATE_USER_DATA_SAGA, BLOCK_USER_REQUEST, BASE_GET_REQUEST_USERS} from "../../sagasTypes";
import {IFilterData, IFilterForm} from "./commonInterfaces";

export interface IAuth {
    type: typeof AUTH,
    data: {mobile: string, code?: string},
    path: string
}

export interface IBaseGetRequestAction<T> {
    type: typeof BASE_GET_REQUEST,
    path: string,
    actionType: T,
    actionDataName: string,
    params?:IFilterForm,
    loadingFalse?:(() => void) | null
}

export interface IBaseGetRequestUsersAction<T, U> {
    type: typeof BASE_GET_REQUEST_USERS,
    path: string,
    actionType: T,
    actionDataName: string,
    data:U
}

export interface IBaseDeleteRequestAction<T, U> {
    type: typeof BASE_DELETE_REQUEST,
    path: string,
    actionType: T,
    actionDataName: string,
    data: U
}

export interface IFilterList<T> {
    type: typeof FILTER_LIST,
    path: string,
    actionType:T,
    actionDataName: string,
    params?:IFilterForm,
    loadingFalse?:(() => void) | null
}

export interface IBasePostRequest<T, U=FormData> {
    type: typeof BASE_POST_REQUEST,
    path: string,
    actionDataName: string,
    actionType: T,
    data: U
}

export interface IBaseBlockUserRequest<T, U=FormData> {
    type: typeof BLOCK_USER_REQUEST,
    path: string,
    actionDataName: string,
    actionType: T,
    data: U
}

export interface IBasePutRequest<T, U=FormData> {
    type: typeof BASE_PUT_REQUEST,
    path: string,
    actionDataName?: string,
    actionType?: T,
    data: U,
    reducerName?: string,
    listName?: string
}

export interface IUpdateUserData<U=FormData> {
    type: typeof UPDATE_USER_DATA_SAGA,
    actionType: typeof UPDATE_USER_DATA,
    path: string,
    data: U,
    userData:any
}