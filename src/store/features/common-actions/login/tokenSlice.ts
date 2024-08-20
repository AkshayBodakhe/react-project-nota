import { createSlice } from '@reduxjs/toolkit'

export const loginDataSlice = createSlice({
  name: 'login',
  initialState: {
    tokenData:{}
  },
  reducers: {
    setTokenData:(state,action) => {
        state.tokenData = action.payload
    }
  },
})

export const { setTokenData } = loginDataSlice.actions

export const loginReducer =  loginDataSlice.reducer
