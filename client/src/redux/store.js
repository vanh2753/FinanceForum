import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // dùng localStorage
import { persistStore, persistReducer } from 'redux-persist'
import { combineReducers } from 'redux'
import { thunk } from 'redux-thunk'

import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'userInfo'] // chỉ định slice nào cần persist
}

const rootReducer = combineReducers({
    auth: authReducer,
    userInfo: userReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            //serializableCheck: false,
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE'],
            },
        }),
})
const persistor = persistStore(store)

export { store, persistor }
