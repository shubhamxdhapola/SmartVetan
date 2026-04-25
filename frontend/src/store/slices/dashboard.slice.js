import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import API_PATHS from "../../constants/apiPaths";

export const getDashboardData = createAsyncThunk(
    'api/dashboard',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.DASHBOARD.SUMMARY
            )
            return response?.data
        } catch (error) {
            console.log(error?.response?.data)
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const getHistoricalData = createAsyncThunk(
    'api/dashboard/history',
    async (month, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.DASHBOARD.HISTORY(month)
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        currentMonth: null,
        customMonth: null,
        recentAdvances: null,
        dailyAdvances: null,
        loading: true,
        customMonthLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getDashboardData.pending, (state) => {
                state.loading = true
            })
            .addCase(getDashboardData.fulfilled, (state, action) => {
                state.loading = false
                state.currentMonth = action?.payload?.currentMonthStats
                state.customMonth = action?.payload?.prevMonthStats
                state.recentAdvances = action?.payload?.recentAdvances
                state.dailyAdvances = action?.payload?.dailyAdvances
            })
            .addCase(getDashboardData.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(getHistoricalData.pending, (state) => {
                state.customMonthLoading = true
            })
            .addCase(getHistoricalData.fulfilled, (state, action) => {
                state.customMonthLoading = false
                state.customMonth = action?.payload?.stats
            })
            .addCase(getHistoricalData.rejected, (state, action) => {
                state.error = action.payload
                state.customMonthLoading = false
            })
    }
})

export default dashboardSlice.reducer
