import {IBaseGetRequestAction} from "../../constants/types/interfaces/actionsInterfaces";
import {GET_SYSTEM_INFO} from "../../constants/actionTypes";
import {BASE_GET_REQUEST} from "../../constants/sagasTypes";

export const getSystemInfoAction = (): IBaseGetRequestAction<typeof GET_SYSTEM_INFO> => {
    return {
        type: BASE_GET_REQUEST,
        path: '/admin/amount/',
        actionType: GET_SYSTEM_INFO,
        actionDataName: 'info'
    }
}