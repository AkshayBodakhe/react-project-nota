import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commonService from "../../services/Common-service";
import { PaginationState, FetchResponseBody } from "../../../../../components/common/enums-and-interfaces/interfaces";

export const locationListThunk = createAsyncThunk('locationList', async (pagination: PaginationState) => {

    try {
        const response: any = await commonService.getData('/location', pagination)
        return response;
    } catch (error: any) {
        return error;
    }

})

const initialState: FetchResponseBody = {
    content: [],
    size: 0,
    totalPages: 0,
    totalElements: 0,
    pageable: {
        pageNumber: 0,
        pageSize: 0
    }
}

const locationListSlice = createSlice({
    name: 'locationList',
    initialState,
    reducers: {
        reset: (state) => {
            state.content = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(locationListThunk.fulfilled, (state, action) => {
            // console.log("action ::", action)
            const { content, totalElements, totalPages, size, pageable: { pageNumber, pageSize } } = action.payload?.data;
            state.content = content;
            state.totalPages = totalPages;
            state.totalElements = totalElements;
            state.size = size;
            state.pageable = {
                pageNumber: pageNumber,
                pageSize: pageSize
            }

        }),
            builder.addCase(locationListThunk.pending, () => {
                // console.log("karan :: in pending", state);
            }),
            builder.addCase(locationListThunk.rejected, (state: any, action) => {
                state.providerList = action.payload || [];
            })
    }
})

export const locationListAction = locationListSlice.actions;
export const locationListReducer = locationListSlice.reducer;