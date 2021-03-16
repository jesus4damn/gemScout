import {put, takeEvery, cancel, select} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {BASE_PUT_REQUEST} from "../../constants/sagasTypes";
import {IBasePutRequest} from "../../constants/types/interfaces/actionsInterfaces";
import {IGemstone} from "../../constants/types/interfaces/commonInterfaces";

function* basePutRequest(action: IBasePutRequest<any, any>) {
    const state = yield select();

    try {

        const response = yield API.put(action.path, action.data, action.data.__proto__.constructor.name === 'FormData');
        if (action.actionType && action.actionDataName) {
            const list = state[action.reducerName as string][action.listName as string];
            const updatedItemIndex = list.findIndex((item: IGemstone) => item.id == response.data.id)

            list[updatedItemIndex] = response.data;

            yield put({
                type: action.actionType,
                [action.actionDataName as string]: [...list]
            });
        }

    }
    catch (err) {
        cancel();
    }
}

export function* watchBasePutRequest() {
    yield takeEvery(BASE_PUT_REQUEST, basePutRequest);
}