import {put, takeEvery, cancel} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {UPDATE_USER_DATA_SAGA} from "../../constants/sagasTypes";
import {IUpdateUserData} from "../../constants/types/interfaces/actionsInterfaces";

function* updateUserData(action: IUpdateUserData<any>) {
    try {

        const response = yield API.put(action.path, action.data, action.data.__proto__.constructor.name === 'FormData');
        yield put({
            type: action.actionType,
            userData: action.userData
        });
    }
    catch (err) {
        cancel();
    }
}

export function* watchUpdateUserData() {
    yield takeEvery(UPDATE_USER_DATA_SAGA, updateUserData);
}