import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import API_PATHS from "../../constants/apiPaths";

export const getEmployees = createAsyncThunk(
    'employee/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.EMPLOYEE.GET_ALL
            )
            return response?.data
        } catch (error) {
            console.log(error?.response?.data)
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const getEmployee = createAsyncThunk(
    'employee/',
    async (employeeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.EMPLOYEE.GET(employeeId)
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const addEmployee = createAsyncThunk(
    'employee/add',
    async (employeeData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.EMPLOYEE.ADD, employeeData
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const updateEmployee = createAsyncThunk(
    'employee/update',
    async ({ employeeId, employeeData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                API_PATHS.EMPLOYEE.UPDATE(employeeId), employeeData
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const deleteEmployee = createAsyncThunk(
    'auth/google-signin',
    async (employeeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                API_PATHS.EMPLOYEE.DELETE(employeeId)
            )
            return employeeId
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: null,
        employee: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getEmployees.pending, (state) => {
                state.loading = true
            })
            .addCase(getEmployees.fulfilled, (state, action) => {
                state.loading = false
                state.employees = action?.payload?.employees
            })
            .addCase(getEmployees.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(getEmployee.pending, (state) => {
                state.loading = true
            })
            .addCase(getEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.employee = action?.payload?.employee
            })
            .addCase(getEmployee.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(addEmployee.pending, (state) => {
                state.loading = true
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.employee = action?.payload?.newEmployee
            })
            .addCase(addEmployee.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false
                const updatedEmployee = action.payload?.updatedEmployee
                const index = state.employees.findIndex(
                    (employee) => employee._id === updatedEmployee._id
                )
                if (index !== -1) {
                    state.employees[index] = updateEmployee
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false
                state.employees = state.employees.filter(
                    (employee) => employee._id !== action.payload
                )
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.error = action.payload
                state.loading = false
            })

    }
})

export default employeeSlice.reducer
