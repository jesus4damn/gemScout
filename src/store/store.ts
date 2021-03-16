import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
//import expireReducer from 'redux-persist-expire';
import createSagaMiddleware from 'redux-saga';
import {rootReducer} from "./reducers/rootReducer";
import rootSaga from "./sagas/rootSaga";
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';


const rootPersistConfig = {
    key: 'rootStorage',
    storage: storage,
    // transforms: [
    //     expireReducer('authorization', {
    //         persistedAtKey: 'loadedAt',
    //         expireSeconds: 86400, // 24 hours
    //         expiredState: {
    //             loginWarning: 'The authorization token expired',
    //             accessToken: null,
    //             refreshToken: null,
    //             expiresIn: null,
    //             loadedAt: null
    //         },
    //     })
    // ],
    whitelist: ['userProfile']
};

const sagaMiddleware = createSagaMiddleware();
const middleware: any[] = [sagaMiddleware];
if (process.env.NODE_ENV === 'development') middleware.push(logger);

const pReducer = persistReducer(rootPersistConfig, rootReducer);
const store: any = createStore(pReducer, applyMiddleware(...middleware));
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { persistor, store };
