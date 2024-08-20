import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../../interceptor/interceptor";
import { FormPayload } from "../../../../components/common/enums-and-interfaces/interfaces";

export const addEditForm: any = createAsyncThunk('addPreference', async (formPayload: FormPayload, thunkAPI) => {

    try {
        const URL = `/api/master/${formPayload.endPoint}`;
        const response: any = await axiosInstance.post(URL, formPayload.payload);
        if (response.status >= 400) {
            throw new Error(response.data?.message || response.data?.code);
        }
        return response.data;
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error);
    }

})