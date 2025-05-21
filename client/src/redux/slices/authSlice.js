import { createSlice } from '@reduxjs/toolkit'
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access_token: null,
        isAuthenticated: false,
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.access_token = action.payload
        },
        setLogout: (state) => {
            state.access_token = null
            state.isAuthenticated = false
        },
        setAuthSuccess: (state, action) => {
            state.access_token = action.payload.access_token;
            state.isAuthenticated = true // sau khi set access token => isAuthenticated = true
        }
    }
})

export const { setAccessToken, setLogout, setAuthSuccess } = authSlice.actions
export default authSlice.reducer;