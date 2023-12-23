import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga"
import {rootSaga} from "../saga/saga.js";
import Slice_User_Data from "./slices/slice_User_Data.js";
import Slice_ToDoList from "./slices/slice_ToDoList.js";
import Slice_Boards from "./slices/slice_Boards.js";

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
    user_data: Slice_User_Data,
    todolist: Slice_ToDoList,
    boards: Slice_Boards,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk: true}).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)