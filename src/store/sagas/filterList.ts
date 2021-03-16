import {put, debounce, cancel} from 'redux-saga/effects';
import {API} from "../../constants/api/api";
import {FILTER_LIST} from "../../constants/sagasTypes";
import {IFilterList} from "../../constants/types/interfaces/actionsInterfaces";
import {FILTER_ALL_USERS_LIST} from "../../constants/actionTypes";

function* filterList(action: IFilterList<any>) {
    try {
        const response = yield API.getWithParams(action.path, action.params);
        yield put({
            type: action.actionType,
            allUsersList: response.data,
            params: action.params
        });
        yield action.loadingFalse && action.loadingFalse();
    }
    catch (err) {
        action.loadingFalse && action.loadingFalse();
        cancel();
    }
}

export function* watchFilterList() {
    yield debounce(300, FILTER_LIST, filterList);
}