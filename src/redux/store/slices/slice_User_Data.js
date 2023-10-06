import {createSlice} from "@reduxjs/toolkit";


const Slice_User_Data = createSlice({
    name: "personal_tests_slice",
    initialState: {
        data: {},
        counter: -1,
    },
    reducers: {
        set_user_data(state, action) {
            state.data = action.payload
        },
        inc(state) {
            state.counter = state.counter + 1
        },

        dec(state) {
            state.counter = state.counter - 1
        }

    }
})

export default Slice_User_Data.reducer

export const {
    set_user_data,
    inc, dec
} = Slice_User_Data.actions