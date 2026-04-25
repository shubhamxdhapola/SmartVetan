import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from '../../services/axiosInstance'
import API_PATHS from '../../constants/apiPaths'

// ─── Helper: current month as YYYY-MM ────────────────────────────────────────
const getCurrentMonth = () => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
}

// ─── Thunks ────────────────────────────────────────────────────────────────

/** Fetch all advances for the employer (no month filter) */
export const getAdvances = createAsyncThunk(
    'advance/all',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(API_PATHS.ADVANCE.GET_ALL)
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

/** Fetch advances filtered by month (YYYY-MM) */
export const getAdvancesByMonth = createAsyncThunk(
    'advance/byMonth',
    async (month, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(API_PATHS.ADVANCE.GET_BY_MONTH(month))
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

/** Fetch stats (totalAdvance, employeesWithAdvance, totalSalaryToBePaid) for a month */
export const getAdvanceStats = createAsyncThunk(
    'advance/stats',
    async (month, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(API_PATHS.ADVANCE.GET_STATS(month))
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const getEmployeeAdvances = createAsyncThunk(
    'advance/byEmployee',
    async (employeeId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.ADVANCE.GET_BY_EMPLOYEE(employeeId)
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const addAdvance = createAsyncThunk(
    'advance/add',
    async (advanceData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(
                API_PATHS.ADVANCE.ADD(advanceData.employeeId),
                advanceData
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const updateAdvance = createAsyncThunk(
    'advance/update',
    async ({ advanceId, advanceData }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.patch(
                API_PATHS.ADVANCE.UPDATE(advanceId),
                advanceData
            )
            return response?.data
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

export const deleteAdvance = createAsyncThunk(
    'advance/delete',
    async (advanceId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(API_PATHS.ADVANCE.DELETE(advanceId))
            return advanceId
        } catch (error) {
            return rejectWithValue(error?.response?.data)
        }
    }
)

// ─── Slice ─────────────────────────────────────────────────────────────────

const advanceSlice = createSlice({
    name: 'advance',
    initialState: {
        advances: [],
        loading: false,
        error: null,
        // ── Stats ─────────────────────────────────
        stats: {
            totalAdvance: 0,
            employeesWithAdvance: 0,
            totalSalaryToBePaid: 0,
        },
        statsLoading: false,
        statsError: null,
        // ── Selected month (drives both list + stats) ──
        selectedMonth: getCurrentMonth(),
    },
    reducers: {
        setSelectedMonth: (state, action) => {
            state.selectedMonth = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            // ── getAdvances (no filter) ───────────────────────────────────
            .addCase(getAdvances.pending, (state) => {
                state.loading = true
            })
            .addCase(getAdvances.fulfilled, (state, action) => {
                state.loading = false
                state.advances = action?.payload?.advances
            })
            .addCase(getAdvances.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // ── getAdvancesByMonth ────────────────────────────────────────
            .addCase(getAdvancesByMonth.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getAdvancesByMonth.fulfilled, (state, action) => {
                state.loading = false
                state.advances = action?.payload?.advances ?? []
            })
            .addCase(getAdvancesByMonth.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // ── getAdvanceStats ───────────────────────────────────────────
            .addCase(getAdvanceStats.pending, (state) => {
                state.statsLoading = true
                state.statsError = null
            })
            .addCase(getAdvanceStats.fulfilled, (state, action) => {
                state.statsLoading = false
                state.stats = action?.payload?.stats ?? state.stats
            })
            .addCase(getAdvanceStats.rejected, (state, action) => {
                state.statsLoading = false
                state.statsError = action.payload
            })

            // ── getEmployeeAdvances ───────────────────────────────────────
            .addCase(getEmployeeAdvances.pending, (state) => {
                state.loading = true
            })
            .addCase(getEmployeeAdvances.fulfilled, (state, action) => {
                state.loading = false
                state.advances = action?.payload?.advances
            })
            .addCase(getEmployeeAdvances.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // ── addAdvance ────────────────────────────────────────────────
            .addCase(addAdvance.pending, (state) => {
                state.loading = true
            })
            .addCase(addAdvance.fulfilled, (state, action) => {
                state.loading = false
                const newAdv = action?.payload?.advance
                if (newAdv) {
                    state.advances = [newAdv, ...state.advances]
                }
            })
            .addCase(addAdvance.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // ── updateAdvance ─────────────────────────────────────────────
            .addCase(updateAdvance.pending, (state) => {
                state.loading = true
            })
            .addCase(updateAdvance.fulfilled, (state, action) => {
                state.loading = false
                const updated = action?.payload?.updatedAdvance
                if (updated) {
                    const index = state.advances.findIndex((a) => a._id === updated._id)
                    if (index !== -1) {
                        state.advances[index] = updated
                    }
                }
            })
            .addCase(updateAdvance.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            // ── deleteAdvance ─────────────────────────────────────────────
            .addCase(deleteAdvance.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteAdvance.fulfilled, (state, action) => {
                state.loading = false
                state.advances = state.advances.filter(
                    (a) => a._id !== action.payload
                )
            })
            .addCase(deleteAdvance.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    },
})

export const { setSelectedMonth } = advanceSlice.actions
export default advanceSlice.reducer
