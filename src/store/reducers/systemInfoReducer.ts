import {GET_SYSTEM_INFO} from "../../constants/actionTypes";
import {ISystemInfo} from "../../constants/types/interfaces/stateInterfaces";
import {IBaseGetRequestAction} from "../../constants/types/interfaces/actionsInterfaces";
import {SystemInfoAction} from "../../constants/types/types";

const initialState: ISystemInfo = {
    applications: 0,
    complaints: 0,
    newUsers: 0,
    sellerApplications: 0,
    users: 0,
    gemstones:[],
    new_applications_per_date:{}
};


export default function systemInfoReducer(
    state=initialState,
    action: SystemInfoAction
): ISystemInfo {
    switch (action.type) {
        case GET_SYSTEM_INFO:
            return {
                ...state,
                applications: action.info.applications,
                complaints: action.info.complaints,
                newUsers: action.info.new_users,
                sellerApplications: action.info.seller_applications,
                users: action.info.users,
                gemstones: action.info.gemstones,
                new_applications_per_date: action.info.new_applications_per_date
            }
        default:
            return state;
    }
}