import { createSlice } from "@reduxjs/toolkit";
import { addEditForm } from "./formService";

const initialState = {
    isError: false,
    isSuccess: false,
    message: ''
}

const addEditFormSlice = createSlice({
    name: 'preferences',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.message = '';
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addEditForm.fulfilled, (state, action) => {
            state.isError = false;
            state.isSuccess = true;
            state.message = action.payload?.message || '';
        }),
            builder.addCase(addEditForm.pending, () => {
                // console.log("karan :: in pending", state);
            }),
            builder.addCase(addEditForm.rejected, (state, action) => {
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload?.message || '';

            })
    }
})

export const addEditAction = addEditFormSlice.actions;
export const addEditReducer = addEditFormSlice.reducer;