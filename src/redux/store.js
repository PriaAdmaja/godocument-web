"use client"
import { configureStore } from '@reduxjs/toolkit';
import {persistReducer, persistStore, PERSIST, REGISTER, REHYDRATE, FLUSH, PAUSE, PURGE} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import reducers from './slices';

const persistConfig = {
    key: 'godocument',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (defaultMiddleware) => {
        return defaultMiddleware({
            serializableCheck: {
                ignoreActions: [PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER, FLUSH ]
            },
            thunk: false
        })
    },
});

export const persistor = persistStore(store);
export default store;