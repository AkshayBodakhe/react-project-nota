import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CommonSnackbarProps } from "../../../../components/common/commonSnackBar/snackBar";


const initialState: CommonSnackbarProps = {
    open: false,
    message: '',
    severity: undefined
};

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<CommonSnackbarProps>) => {
            const { open, message, severity } = action.payload;
            state.open = open;
            state.message = message;
            state.severity = severity;
        },
        resetAlert: (state) => {
            const { open, message, severity } = initialState;
            state.open = open;
            state.message = message;
            state.severity = severity;
        }
    },
    // extraReducers: {}
})

export const alertAction = alertSlice.actions;
export const alertReducer = alertSlice.reducer;