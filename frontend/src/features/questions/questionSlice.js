import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    question: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
})

export const { reset } = questionSlice.actions
export default questionSlice.reducer