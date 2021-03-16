import {BASE_GET_REQUEST, BASE_GET_REQUEST_USERS, BLOCK_USER_REQUEST, FILTER_LIST, UPDATE_USER_DATA_SAGA, UPDATE_USER_SETTINGS_SAGA} from "../../constants/sagasTypes";
import {IBaseGetRequestAction, IFilterList, IUpdateUserData, IBaseBlockUserRequest, IBaseGetRequestUsersAction} from "../../constants/types/interfaces/actionsInterfaces";
import {GET_ALL_USERS_LIST, GET_NEW_USERS_LIST, UPDATE_USER_DATA, BLOCK_USER, GET_NEW_USERS_LIST_ADD, GET_ALL_USERS_LIST_ADD} from "../../constants/actionTypes";
import {IFilterData, IFilterForm, IUserForm} from "../../constants/types/interfaces/commonInterfaces";
import {ISettingsForm} from "../../components/all_users_page/Settings";

export const getNewUsersListAction = (loadingFalse:() => void): IBaseGetRequestAction<typeof GET_NEW_USERS_LIST> => {
    return {
        type: BASE_GET_REQUEST,
        path: '/admin/user/new/?page=1',
        actionType: GET_NEW_USERS_LIST,
        actionDataName: 'newUsersList',
        loadingFalse
    }
}

export const getAllUsersListAction = (loadingFalse:(() => void) | null, params?: IFilterForm): IBaseGetRequestAction<typeof GET_ALL_USERS_LIST> => {
    return {
        type: BASE_GET_REQUEST,
        path: `/admin/user/all/?page=1`,
        actionType: GET_ALL_USERS_LIST,
        actionDataName: 'allUsersList',
        params,
        loadingFalse
    }
}

export const addNewUsersListAction = (page:number, setLoading: () => void): IBaseGetRequestUsersAction<typeof GET_NEW_USERS_LIST_ADD, {page:number, setLoading: () => void}> => {
    return {
        type: BASE_GET_REQUEST_USERS,
        path: `/admin/user/new/?page=${page}`,
        actionType: GET_NEW_USERS_LIST_ADD,
        actionDataName: 'newUsersList',
        data:{
            page,
            setLoading
        }
    }
}

export const addAllUsersListAction = (page:number, setLoading: () => void, params: IFilterForm | undefined): IBaseGetRequestUsersAction<typeof GET_ALL_USERS_LIST_ADD, {page:number, setLoading: () => void, params: IFilterForm | undefined}> => {
    return {
        type: BASE_GET_REQUEST_USERS,
        path: `/admin/user/all/?page=${page}`,
        actionType: GET_ALL_USERS_LIST_ADD,
        actionDataName: 'allUsersList',
        data:{
            page,
            setLoading,
            params
        }
    }
}

export const updateUserSettingsAction = (data: ISettingsForm) => {
    return {
        type: UPDATE_USER_SETTINGS_SAGA,
        data: data
    }
}

export const updateUserDataAction = (data: FormData, userData: IUserForm): IUpdateUserData<FormData> => {
    return {
        type: UPDATE_USER_DATA_SAGA,
        path: "/admin/user/update/",
        actionType: UPDATE_USER_DATA,
        data:data,
        userData:userData
    }
}

export const blockUserAction = (id: number, status: number, restrictions: (number | false)[], bool: boolean): IBaseBlockUserRequest<typeof BLOCK_USER, {id: number, status: number, restrictions: (number | false)[], bool: boolean}> => {
    return {
        type: BLOCK_USER_REQUEST,
        actionType: BLOCK_USER,
        actionDataName:"data",
        path: `/admin/user/setting/`,
        data: {id, status, restrictions, bool}
    }
}



export const filterAllUsersListAction = (loadingFalse:(() => void) | null, params?: IFilterForm): IFilterList<typeof GET_ALL_USERS_LIST> => {
    return {
        type: FILTER_LIST,
        path: `/admin/user/all/?page=1`,
        actionType: GET_ALL_USERS_LIST,
        actionDataName: 'allUsersList',
        params,
        loadingFalse
    }
}