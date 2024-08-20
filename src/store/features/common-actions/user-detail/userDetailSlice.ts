import { createSlice } from '@reduxjs/toolkit'

export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState: {
    data:{}
  },
  reducers: {
    setDetailData:(state,action) => {
        state.data = action.payload
    }
  },
})

export const { setDetailData } = userDetailSlice.actions

export const userDetailReducer =  userDetailSlice.reducer
