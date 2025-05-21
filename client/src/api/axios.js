import axios from 'axios'
import { store } from '../redux/store'
import { setAccessToken, setLogout } from '../redux/slices/authSlice'
import { setUser } from '../redux/slices/userSlice'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true // Important for cookies
})

let isRefreshing = false;

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth?.access_token || localStorage.getItem('access_token'); // đề phòng token chưa có trong redux

        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // đính access_token vào header
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// Add a request interceptor
axiosInstance.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config
        if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {

            if (isRefreshing) return Promise.reject(error)
            isRefreshing = true
            originalRequest._retry = true

            try {
                const res = await axiosInstance.post('/refresh-token')
                const { access_token, user } = res.data.DT

                store.dispatch(setAccessToken(access_token))
                store.dispatch(setUser(user))
                localStorage.setItem('access_token', access_token)

                originalRequest.headers.Authorization = `Bearer ${access_token}`
                isRefreshing = false
                return axiosInstance(originalRequest)
            } catch (err) {
                store.dispatch(setLogout())
                store.dispatch(setUser(null))
                localStorage.removeItem('access_token')

                isRefreshing = false
                window.location.href = '/'
                return Promise.reject(err)
            }
        }

        return Promise.reject(error)
    }
)

export default axiosInstance