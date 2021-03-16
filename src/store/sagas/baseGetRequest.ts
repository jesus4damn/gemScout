import {put, debounce, cancel, takeEvery} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {BASE_GET_REQUEST} from "../../constants/sagasTypes";
import {IBaseGetRequestAction} from "../../constants/types/interfaces/actionsInterfaces";

function* baseGetRequest(action: IBaseGetRequestAction<any>) {
    try {
        if(action.params){
            const response = yield API.getWithParams(action.path, action.params);
            yield put({
                type: action.actionType,
                allUsersList: response.data,
                params: action.params
            });
        } else {
            const response = yield API.get(action.path);
            yield put({
                type: action.actionType,
                [action.actionDataName]: response.data,
            });
        }
        yield action.loadingFalse && action.loadingFalse();
    }
    catch (err) {
        action.loadingFalse && action.loadingFalse();
        cancel();
    }
}

export function* watchBaseGetRequest() {
    yield takeEvery(BASE_GET_REQUEST, baseGetRequest);
}