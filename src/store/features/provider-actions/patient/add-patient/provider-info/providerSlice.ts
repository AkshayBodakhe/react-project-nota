import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import commonService from "../../../services/Common-service";
import { PaginationState, FetchResponseBody } from "../../../../../../components/common/enums-and-interfaces/interfaces";

export const providerListThunk = createAsyncThunk('providerList', async (pagination: PaginationState) => {

    try {
        const response: any = await commonService.getData('/provider', pagination)
        // console.log("karannnnnnnnnnnnnnn :: ", response);

        // if (response.status >= 400) {
        //     throw new Error(response.data?.message || response.data?.code);
        // }
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

const providerListSlice = createSlice({
    name: 'providerList',
    initialState,
    reducers: {
        reset: (state) => {
            state.content = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(providerListThunk.fulfilled, (state, action) => {
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
            builder.addCase(providerListThunk.pending, () => {
                // console.log("karan :: in pending", state);
            }),
            builder.addCase(providerListThunk.rejected, (state: any, action) => {
                state.providerList = action.payload || [];
            })
    }
})

export const providerListAction = providerListSlice.actions;
export const providerListReducer = providerListSlice.reducer;