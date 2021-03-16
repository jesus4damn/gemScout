import {IUsers} from "../../constants/types/interfaces/stateInterfaces";
import {
    BLOCK_USER,
    FILTER_ALL_USERS_LIST,
    GET_ALL_USERS_LIST,
    GET_NEW_USERS_LIST,
    UPDATE_USER_DATA,
    UPDATE_USER_SETTINGS,
    GET_NEW_USERS_LIST_ADD,
    GET_ALL_USERS_LIST_ADD,
    SET_SUBSCRIBE,
    SET_SEND_MESSAGE
} from "../../constants/actionTypes";
import {UsersAction} from "../../constants/types/types";

const initialState: IUsers = {
    allUsers: [],
    currentPageAllUsers:1,
    newUsers: [],
    currentPageNewUsers:1,
    params: undefined,
    subscribe: false,
    sendMessage: null
};

export default function usersReducer(
    state=initialState,
    action: UsersAction
): IUsers {
    switch (action.type) {
        case GET_ALL_USERS_LIST:
        case FILTER_ALL_USERS_LIST:
            return {
                ...state,
                allUsers: [...action.allUsersList],
                currentPageAllUsers: 1,
                params: action.params
            }
        case GET_ALL_USERS_LIST_ADD:
            return {
                ...state,
                allUsers: [...state.allUsers,...action.allUsersList],
                currentPageAllUsers: action.allUsersList.length > 0 ? action.page : null
            }
        case GET_NEW_USERS_LIST:
            return {
                ...state,
                newUsers: [...action.newUsersList]
            }
        case GET_NEW_USERS_LIST_ADD:
            return {
                ...state,
                newUsers: [...state.newUsers,...action.newUsersList],
                currentPageNewUsers: action.newUsersList.length > 0 ? action.page : null
            }
        case UPDATE_USER_SETTINGS:
            return {
                ...state,
                allUsers: [...action.updatedList]
            }
        case UPDATE_USER_DATA:
            const indexUpdate = state.allUsers.findIndex((item) => item.mobile === action.userData.id);
            if(indexUpdate !== -1){
                state.allUsers[indexUpdate].first_name = action.userData.first_name;
                state.allUsers[indexUpdate].last_name = action.userData.last_name;
                state.allUsers[indexUpdate].company_name = action.userData.company_name;
                state.allUsers[indexUpdate].number = action.userData.number;
                state.allUsers[indexUpdate].gemstones = action.userData.gemstones!.filter((item) => item.bool);
                if(action.userData.image && typeof action.userData.image !== 'string'){
                    let reader = new FileReader();
                    reader.readAsDataURL(action.userData.image);
                    reader.onload = function (e) {
                        state.allUsers[indexUpdate].avatar_image = e.target!.result as any;
                    }
                }
                state.allUsers[indexUpdate] = {...state.allUsers[indexUpdate]};
            }
            return {
                ...state,
                allUsers: [...state.allUsers]
            }
        case BLOCK_USER:
            const indexBlock = state.allUsers.findIndex((item) => item.mobile === action.data.id);
            if(indexBlock !== -1){
                state.allUsers[indexBlock].restrictions = [...action.data.restrictions];
                state.allUsers[indexBlock] = {...state.allUsers[indexBlock]};
            }
            return {
                ...state,
                allUsers: [...state.allUsers]
            }
        case SET_SUBSCRIBE:
            return {
                ...state,
                subscribe:action.subscribe
            }
        case SET_SEND_MESSAGE:
            return {
                ...state,
                sendMessage: action.message
            }
        default:
            return state;
    }
}