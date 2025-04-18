import axios from 'axios';
import { store } from '../redux/store'
import { setAccessToken, setIsAuthenticated } from '../redux/slices/authSlice';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    const token = useSelector(state => state.auth.access_token)
    if (token) {
        config.headers.Authorization = `Bearer ${token}` // gắn access_token vào header
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(
    (res) => res,  // Success callback: trả về response nếu không có lỗi
    async (error) => {  // Error callback: xử lý khi có lỗi
        const originalRequest = error.config  // Lấy thông tin của request ban đầu

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true  // Đánh dấu là đã thử lại rồi để tránh vòng lặp vô hạn

            try {
                // Gọi API để lấy lại token mới
                const res = await instance.post('/refresh-token')

                const newToken = res.data.DT.access_token

                // Cập nhật lại token và trạng thái trong Redux
                store.dispatch(setAccessToken(newToken))
                store.dispatch(setIsAuthenticated(true))

                // Gắn token mới vào header của request cũ
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`

                // Gửi lại request cũ với token mới
                return instance(originalRequest)  // Retry lại request ban đầu
            } catch (refreshErr) {
                console.error('Refresh token failed', refreshErr)  // Xử lý lỗi nếu không thể refresh token
                return Promise.reject(refreshErr)
            }
        }

        return Promise.reject(error)  // Nếu không phải 401 hoặc không thể refresh token, trả về lỗi gốc
    }
)


export default instance;