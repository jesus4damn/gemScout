import { combineReducers } from "redux";
import userProfileReducer from "./userProfileReducer";
import systemInfoReducer from "./systemInfoReducer";
import modalWindowReducer from "./modalWindowReducer";
import usersReducer from "./usersReducer";
import gemstonesReducer from "./gemstonesReducer";

export const rootReducer = combineReducers({
    userProfile: userProfileReducer,
    systemInfo: systemInfoReducer,
    modalWindow: modalWindowReducer,
    users: usersReducer,
    gemstones: gemstonesReducer
});

export type RootState = ReturnType<typeof rootReducer>