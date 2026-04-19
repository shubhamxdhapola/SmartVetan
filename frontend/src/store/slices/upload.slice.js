import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import API_PATHS from "../../constants/apiPaths";

export const uploadImage = createAsyncThunk(
    'api/upload',
    async (image, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`${API_PATHS.IMAGE_UPLOAD}`, image, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            return response.data.profileImage
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        profileImage: null,
        uploading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadImage.pending, (state) => {
                state.uploading = true
            })
            .addCase(uploadImage.fulfilled, (state, action) => {
                state.uploading = false
                state.profileImage = action.payload
            })
            .addCase(uploadImage.rejected, (state, action) => {
                state.uploading = false
                state.error = action.payload
            })
    }
})

export default uploadSlice.reducer