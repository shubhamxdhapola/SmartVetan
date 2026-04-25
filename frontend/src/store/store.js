import { configureStore } from "@reduxjs/toolkit"
import authSlice from './slices/auth.slice.js'
import dashboardSlice from './slices/dashboard.slice.js'
import paginationSlice from './slices/pagination.slice.js'
import employeeSlice from './slices/employee.slice.js'
import uploadSlice from './slices/upload.slice.js'
import advanceSlice from './slices/advance.slice.js'

const store = configureStore({
    reducer: {
        auth: authSlice,
        dashboard: dashboardSlice,
        pagination: paginationSlice,
        employee: employeeSlice,
        upload: uploadSlice,
        advance: advanceSlice,
    }
})

export default store