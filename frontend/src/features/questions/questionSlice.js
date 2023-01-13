import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import questionService from "./questionService";

const initialState = {
    questions: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new question
export const createQuestion = createAsyncThunk('questions/create', async (questionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await questionService.createQuestion(questionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message
            || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Get all questions
export const getQuestions = createAsyncThunk('questions/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await questionService.getQuestions(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message
            || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Delete question
export const deleteQuestion = createAsyncThunk('questions/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await questionService.deleteQuestion(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message
            || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

// Update question
export const updateQuestion = createAsyncThunk('questions/delete', async (id, questionData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await questionService.updateQuestion(id, questionData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message
            || error.message || error.toString())
        return thunkAPI.rejectWithValue(message)
    }
})

export const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createQuestion.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createQuestion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions.push(action.payload)
            })
            .addCase(createQuestion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getQuestions.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getQuestions.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions = action.payload
            })
            .addCase(getQuestions.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteQuestion.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questions = state.questions.filter((question) => question._id !== action.payload.id)
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = questionSlice.actions
export default questionSlice.reducer