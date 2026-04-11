import { configureStore } from "@reduxjs/toolkit"
import authSlice from './slices/auth.slice.js'
import dashboardSlice from './slices/dashboard.slice.js'
import paginationSlice from './slices/pagination.slice.js'

const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice,
        pagination: paginationSlice,
    }
})

export default store