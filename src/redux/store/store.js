import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"
import {rootSaga} from "../saga/saga.js";
import Slice_User_Data from "./slices/slice_User_Data.js";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    user_data: Slice_User_Data,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true}).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)