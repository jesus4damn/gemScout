import {put, takeEvery, cancel} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {BASE_POST_REQUEST} from "../../constants/sagasTypes";
import {IBasePostRequest} from "../../constants/types/interfaces/actionsInterfaces";

function* basePostRequest(action: IBasePostRequest<any, any>) {
    try {
        const response = yield API.post(action.path, action.data, action.data.__proto__.constructor.name === 'FormData');
        yield put({
            type: action.actionType,
            [action.actionDataName]: response.data
        });
    }
    catch (err) {
        cancel();
    }
}

export function* watchBasePostRequest() {
    yield takeEvery(BASE_POST_REQUEST, basePostRequest);
}