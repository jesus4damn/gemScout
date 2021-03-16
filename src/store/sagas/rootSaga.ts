import { all } from 'redux-saga/effects';
import {watchAuthorization} from "./authorization";
import {watchBaseGetRequest} from "./baseGetRequest";
import {watchFilterList} from "./filterList";
import {watchBasePostRequest} from "./basePostRequest";
import {watchBasePutRequest} from "./basePutRequest";
import {watchUpdateUserSettings} from "./updateUserSettings";
import { watchBaseDeleteRequest } from './baseDeleteRequest';
import { watchUpdateUserData } from './updateUserData';
import { watchBlockUserRequest } from './blockUserRequest';
import { watchAddUsersData } from './addUsersRequest';

export default function* rootSaga () {
    yield all([
        watchAuthorization(),
        watchBaseGetRequest(),
        watchFilterList(),
        watchBasePostRequest(),
        watchBasePutRequest(),
        watchUpdateUserSettings(),
        watchBaseDeleteRequest(),
        watchUpdateUserData(),
        watchBlockUserRequest(),
        watchAddUsersData()
    ])
}