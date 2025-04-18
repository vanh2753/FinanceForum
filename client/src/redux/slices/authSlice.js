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
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload
        },
        setLogout: (state) => {
            state.access_token = null
            state.isAuthenticated = false
        }
    }
})

export const { setAccessToken, setIsAuthenticated, setLogout } = authSlice.actions
export default authSlice.reducer;