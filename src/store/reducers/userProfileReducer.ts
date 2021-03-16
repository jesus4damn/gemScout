import {CHANGE_AUTH_STEP, VERIFY_SUCCESS, LOGOUT, SET_SUBSCRIBE} from "../../constants/actionTypes";
import {IUserProfile} from "../../constants/types/interfaces/stateInterfaces";
import {UserProfileAction} from "../../constants/types/types";

const initialState: IUserProfile = {
   isLogin: false,
   token: null,
   authStep: {
       step: 1,
       mobile: null
   },
   avatar: '',
   name: '',
   id: null
};


export default function userProfileReducer(
    state=initialState,
    action: UserProfileAction
): IUserProfile {
    switch (action.type) {
        case VERIFY_SUCCESS:
            return {
                ...state,
                isLogin: true,
                token: action.token,
                avatar: action.avatar,
                name: action.name,
                id: action.id
            }
        case LOGOUT:
            return {
                ...state,
                isLogin: false,
                token: null,
                authStep: {
                    step: 1,
                    mobile: null
                },
                id: null
            }
        case CHANGE_AUTH_STEP:
            return {
               ...state,
               authStep: {
                   ...state.authStep,
                   step: 2,
                   mobile: action.data
               }
            }
        default:
            return state;
    }
}