import {createSlice} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";


const Slice_ToDoList = createSlice({
    name: "todolist",
    initialState: {
        data: [
            {
                id: uuidv4(),
                title: 'Залупная2',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Пупа'
                    },
                    {
                        id: uuidv4(),
                        info: 'Пришла',
                    },
                    {
                        id: uuidv4(),
                        info: 'за',
                    },
                    {
                        id: uuidv4(),
                        info: 'Лупой',
                    },
                    {
                        id: uuidv4(),
                        info: 'а',
                    },
                    {
                        id: uuidv4(),
                        info: 'Лупа',
                    },
                    {
                        id: uuidv4(),
                        info: 'Пришла',
                    },
                    {
                        id: uuidv4(),
                        info: 'за',
                    },
                    {
                        id: uuidv4(),
                        info: 'Пупой'
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Пиздец3',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Пизда пришла за Лупой, а тут понаписано куча хуйни'
                    },
                    {
                        id: uuidv4(),
                        info: 'А мытая лупа пришла за пиздой и хуем, чтоб смачно так отсосать, ну и пиздец же она сосёт. Ну хуйня это веб, я так заебался его писать :(',
                    },
                    {
                        id: uuidv4(),
                        info: 'за',
                    },
                    {
                        id: uuidv4(),
                        info: 'Лупой',
                    },
                    {
                        id: uuidv4(),
                        info: 'а',
                    },
                    {
                        id: uuidv4(),
                        info: 'Лупа',
                    },
                    {
                        id: uuidv4(),
                        info: 'Пришла',
                    },
                    {
                        id: uuidv4(),
                        info: 'за',
                    },
                    {
                        id: uuidv4(),
                        info: 'Пупой'
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Залупная4',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Залупа',
                    },
                    {
                        id: uuidv4(),
                        info: 'Пупа',
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Пиздец5',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Пизда',
                    },
                    {
                        id: uuidv4(),
                        info: 'Мытая',
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Пиздец5',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Пизда',
                    },
                    {
                        id: uuidv4(),
                        info: 'Мытая',
                    },
                ],
            },
            {
                id: uuidv4(),
                title: 'Пиздец5',
                content: [
                    {
                        id: uuidv4(),
                        info: 'Пизда',
                    },
                    {
                        id: uuidv4(),
                        info: 'Мытая',
                    },
                ],
            },
        ],
    },
    reducers: {
        set_todolist(state, action) {
            state.data = action.payload
        },
    }
})

export default Slice_ToDoList.reducer

export const {
    set_todolist,
} = Slice_ToDoList.actions