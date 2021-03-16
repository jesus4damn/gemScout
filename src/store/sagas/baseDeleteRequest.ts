import {put, takeEvery, cancel} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {BASE_DELETE_REQUEST} from "../../constants/sagasTypes";
import {IBaseDeleteRequestAction} from "../../constants/types/interfaces/actionsInterfaces";

function* baseDeleteRequest(action: IBaseDeleteRequestAction<any, any>) {
    try {
        const response = yield API.delete(action.path);
        yield put({
            type: action.actionType,
            [action.actionDataName]: action.data.id,
        });
    }
    catch (err) {
        cancel();
    }
}

export function* watchBaseDeleteRequest() {
    yield takeEvery(BASE_DELETE_REQUEST, baseDeleteRequest);
}