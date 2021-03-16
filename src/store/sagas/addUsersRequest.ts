import {put, takeEvery, cancel} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {BASE_GET_REQUEST_USERS} from "../../constants/sagasTypes";
import {IBaseGetRequestUsersAction} from "../../constants/types/interfaces/actionsInterfaces";

function* addUsersRequest(action: IBaseGetRequestUsersAction<any, any>) {
    try {
        if(action.data.params){
            const response = yield API.getWithParams(action.path, action.data.params);
            action.data.setLoading();
            yield put({
                type: action.actionType,
                [action.actionDataName]: response.data,
                page: action.data.page
            });
        } else {
            const response = yield API.get(action.path);
            action.data.setLoading();
            yield put({
                type: action.actionType,
                [action.actionDataName]: response.data,
                page: action.data.page
            });
        }
    }
    catch (err) {
        action.data.setLoading();
        cancel();
    }
}

export function* watchAddUsersData() {
    yield takeEvery(BASE_GET_REQUEST_USERS, addUsersRequest);
}