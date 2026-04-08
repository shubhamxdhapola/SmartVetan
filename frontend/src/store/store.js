import { configureStore } from "@reduxjs/toolkit"
import authSlice from './slices/auth.slice.js'
import dashboardSlice from './slices/dashboard.slice.js'

const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice
    }
})

export default store