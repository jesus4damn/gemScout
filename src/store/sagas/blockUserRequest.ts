import {put, takeEvery, cancel, select} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {BLOCK_USER_REQUEST} from "../../constants/sagasTypes";
import {IBaseBlockUserRequest} from "../../constants/types/interfaces/actionsInterfaces";

function* blockUserRequest(action: IBaseBlockUserRequest<any, any>) {
    try {
        const response = yield API.put(action.path, action.data, action.data.__proto__.constructor.name === 'FormData');
        yield put({
            type: action.actionType,
            [action.actionDataName]: action.data
        });
    }
    catch (err) {
        cancel();
    }
}

export function* watchBlockUserRequest() {
    yield takeEvery(BLOCK_USER_REQUEST, blockUserRequest);
}