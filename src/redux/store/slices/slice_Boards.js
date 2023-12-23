import {createSlice} from "@reduxjs/toolkit";


const Slice_Boards = createSlice({
    name: "boards_slice",
    initialState: {
        boards_data: [
            {
                id: 1,
                title: 'Доска для души',
                fav: true,
                backgroundIm: '',
            },
            {
                id: 2,
                title: 'Доска для тела',
                fav: false,
                backgroundIm: '',
            },
            {
                id: 3,
                title: 'Доска для красоты',
                fav: false,
                backgroundIm: '',
            },
            {
                id: 4,
                title: 'Доска для глаз',
                fav: false,
                backgroundIm: '',
            },
            {
                id: 4,
                title: 'Доска для анимешнкиов',
                fav: false,
                backgroundIm: '',
            },
            {
                id: 5,
                title: 'Доска для людей',
                fav: false,
                backgroundIm: '',
            },
            {
                id: 6,
                title: 'Доска для программстов',
                fav: true,
                backgroundIm: '',
            },
            {
                id: 7,
                title: 'Доска для геншинят',
                fav: false,
                backgroundIm: '',
            },
            {
                id: 8,
                title: 'Доска для геншинят',
                fav: false,
                backgroundIm: '',
            },
            {
                id: 9,
                title: 'Доска для собак',
                fav: false,
                backgroundIm: '',
            },
            {
                id: 10,
                title: 'Доска для кошек',
                fav: false,
                backgroundIm: '',
            }
        ],
    },
    reducers: {
        set_boards_data(state, action) {
            state.boards_data = action.payload
        },
    }
})

export default Slice_Boards.reducer

export const {
    set_user_data,
} = Slice_Boards.actions