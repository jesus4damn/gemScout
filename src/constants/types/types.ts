import {
    ADD_GEMSTONE, ADD_SHAPE,
    BLOCK_USER,
    CHANGE_AUTH_STEP, CHANGE_SHAPES_ORDER,
    CLOSE_MODAL, DELETE_GEMSTONE, DELETE_SHAPE, FILTER_ALL_USERS_LIST,
    GET_ALL_USERS_LIST, GET_GEMSTONES_LIST, GET_NEW_USERS_LIST, GET_SHAPES_LIST,
    GET_SYSTEM_INFO,
    LOGOUT,
    OPEN_MODAL, UPDATE_GEMSTONE, UPDATE_USER_DATA, UPDATE_USER_SETTINGS,
    VERIFY_SUCCESS, GET_ALL_USERS_LIST_ADD, GET_NEW_USERS_LIST_ADD, SET_SUBSCRIBE, SET_SEND_MESSAGE
} from "../actionTypes";
import React from "react";
import {IFilterForm, IGemstone, IMessage, INewUser, IShape, IUser, IUserForm} from "./interfaces/commonInterfaces";
import { ISystemInfo } from "./interfaces/stateInterfaces";

export type Component = typeof React.Component | React.FC;

export enum UserRole {'Verified user'=1, 'Rejected user'=2, 'Admin'=3, 'Moderator'=4, 'User'=5}

export enum GamestoneFeatures {'Color'=1, 'Origin'=2, 'Clarity'=3, 'Treatment'=4}

export enum GamestoneTypes {'text'=1, 'list'=2}

export enum UserPages {'Profile'=0, 'Request'=1, 'Offers'=2, 'Chats'=3}

export enum RequestsPages {'Active'=0, 'Archived'=1}

export enum Months {'January'=0, 'February'=1, 'Mart'=2, 'April'=3, 'May'=4, 'June'=5, 'Jule'=6, 'August'=7, 'September'=8, 'October'=9, 'November'=10, 'December' = 11}

export type UserProfileAction =
    {type: typeof LOGOUT} |
    {type: typeof VERIFY_SUCCESS, token: string, avatar: string, name: string, id: number} |
    {type: typeof CHANGE_AUTH_STEP, data: any};

export type SystemInfoAction = {
    type: typeof GET_SYSTEM_INFO,
    info: {applications:number,complaints:number,new_users:number,seller_applications:number,users:number,gemstones:{name:string, count:number}[],new_applications_per_date:any}
}

export type ModalWindowAction =
    {type: typeof CLOSE_MODAL} |
    {
        type: typeof OPEN_MODAL,
        body: Component | null,
        parameters: {[key: string]: any} | {},
        title: string | null,
        withBtn: boolean,
        bodyWidth: string
    }

export type UsersAction =
    {type: typeof GET_ALL_USERS_LIST | typeof FILTER_ALL_USERS_LIST, allUsersList: IUser[], params?: IFilterForm} |
    {type: typeof GET_NEW_USERS_LIST, newUsersList: INewUser[]} |
    {type: typeof UPDATE_USER_SETTINGS, updatedList: IUser[]} |
    {type: typeof UPDATE_USER_DATA, userData: IUserForm} |
    {type: typeof BLOCK_USER, data: {id: number, bool: boolean, restrictions: number[]}} |
    {type: typeof GET_ALL_USERS_LIST_ADD, page: number, allUsersList: IUser[]} |
    {type: typeof GET_NEW_USERS_LIST_ADD, page: number, newUsersList: INewUser[]} |
    {type: typeof SET_SUBSCRIBE, subscribe: boolean} |
    {type: typeof SET_SEND_MESSAGE, message: IMessage | null}

export type GemstonesActions =
    {type: typeof CHANGE_SHAPES_ORDER | typeof GET_SHAPES_LIST, shapesList: IShape[]} |
    {type: typeof GET_GEMSTONES_LIST | typeof UPDATE_GEMSTONE, gemstonesList: IGemstone[]} |
    {type: typeof ADD_GEMSTONE, newGemstone: IGemstone} |
    {type: typeof ADD_SHAPE, newShape: IShape} | 
    {type: typeof DELETE_SHAPE, id: number} |
    {type: typeof DELETE_GEMSTONE, id: number}
