import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import { useDispatch } from 'react-redux'
import { setAccessToken, setIsAuthenticated } from '../redux/slices/authSlice'
import { setUser } from '../redux/slices/userSlice'
import instance from '../api/axios'
import { useEffect } from 'react'

const AppRoutes = () => {
    const dispatch = useDispatch()

    const initAuth = async () => {
        try {
            const res = await instance.post('/refresh-token')
            const newToken = res.data.DT.access_token
            const user = res.data.DT.user

            dispatch(setAccessToken(newToken))
            dispatch(setIsAuthenticated(true))
            dispatch(setUser(user))
        } catch (err) {
            // chưa đăng nhập
        }
    }

    useEffect(() => {
        initAuth() // gọi api refresh token 1 lần mỗi khi server khởi động
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>
    )
}

export default AppRoutes
