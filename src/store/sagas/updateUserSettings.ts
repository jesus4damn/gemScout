import {put, takeEvery, cancel, select} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {UPDATE_USER_SETTINGS_SAGA} from "../../constants/sagasTypes";
import {IUser} from "../../constants/types/interfaces/commonInterfaces";
import {ISettingsForm} from "../../components/all_users_page/Settings";
import {UserRole} from "../../constants/types/types";
import {CLOSE_MODAL, UPDATE_USER_SETTINGS} from "../../constants/actionTypes";

function* updateUserSettings(action: {type: typeof UPDATE_USER_SETTINGS_SAGA, data: ISettingsForm}) {
    const state = yield select();

    try {
        const {id, status, restrictions} = action.data;


        const data = {
            id: id,
            status: UserRole[status] ? UserRole[status] : null,
            restrictions: restrictions
        };

        const response = yield API.put('/admin/user/setting/', data);

        const list: IUser[] = state.users.allUsers;
        const updatedItemIndex: number = list.findIndex((item: IUser) => item.mobile == response.data.id)

        list[updatedItemIndex] = {
            ...list[updatedItemIndex],
            status: response.data.status,
            restrictions: restrictions
        };

        yield put({
            type: UPDATE_USER_SETTINGS,
            updatedList: [...list]
        });
        yield put({
            type: CLOSE_MODAL
        });
    }
    catch (err) {
        cancel();
    }
}

export function* watchUpdateUserSettings() {
    yield takeEvery(UPDATE_USER_SETTINGS_SAGA, updateUserSettings);
}