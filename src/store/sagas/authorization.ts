import {put, takeLatest, cancel} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {AUTH} from "../../constants/sagasTypes";
import {IAuth} from "../../constants/types/interfaces/actionsInterfaces";
import {CHANGE_AUTH_STEP, VERIFY_SUCCESS} from "../../constants/actionTypes";


function* authorization(action: IAuth) {
    try {
        const response = yield API.post(action.path, action.data);
        console.log("Auth", response.data);
        if (response.data.token) {
            yield API.setAuthHeader(response.data.token);
            yield put({
                type: VERIFY_SUCCESS,
                token: response.data.token,
                avatar: response.data.avatar_image,
                name: response.data.first_name + ' ' + response.data.last_name,
                id: response.data.mobile
            });
        }
        else {
            yield put({
                type: CHANGE_AUTH_STEP,
                data: response.data.mobile
            })
        }

    }
    catch (err) {
        cancel()
    }
}

export function* watchAuthorization() {
    yield takeLatest(AUTH, authorization);
}