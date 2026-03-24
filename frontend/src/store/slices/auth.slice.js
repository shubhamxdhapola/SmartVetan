import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import API_PATHS from "../../constants/apiPaths";

export const registerEmployer = createAsyncThunk(
    'auth/register',
    async (employerData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.AUTH.REGISTER, employerData
            )
            return response?.data
        } catch (error) {
            console.log(error?.response?.data)
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const loginEmployer = createAsyncThunk(
    'auth/login',
    async (employerData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.AUTH.LOGIN, employerData
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const logoutEmployer = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.AUTH.LOGOUT
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const getEmployerInfo = createAsyncThunk(
    'auth/get-employer-info',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.AUTH.GET_EMPLOYER_INFO
            )
            return response?.data?.employer
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        employer: null,
        loading: false,
        authenticating: true,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(registerEmployer.pending, (state) => {
                state.loading = true
            })
            .addCase(registerEmployer.fulfilled, (state, action) => {
                state.loading = false
                state.employer = action?.payload?.employer
            })
            .addCase(registerEmployer.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(loginEmployer.pending, (state) => {
                state.loading = true
            })
            .addCase(loginEmployer.fulfilled, (state, action) => {
                state.loading = false
                state.employer = action?.payload?.employer
            })
            .addCase(loginEmployer.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(logoutEmployer.pending, (state) => {
                state.loading = true
            })
            .addCase(logoutEmployer.fulfilled, (state, action) => {
                state.loading = false
                state.employer = null
            })
            .addCase(logoutEmployer.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(getEmployerInfo.pending, (state) => {
                state.authenticating = true
            })
            .addCase(getEmployerInfo.fulfilled, (state, action) => {
                state.authenticating = false
                state.employer = action.payload
            })
            .addCase(getEmployerInfo.rejected, (state, action) => {
                state.error = action.payload
                state.authenticating = false
            })
    }
}) 

export default authSlice.reducer
