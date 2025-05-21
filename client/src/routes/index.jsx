import { Routes, Route, Navigate } from 'react-router-dom'
import ForumPage from '../pages/Forum/ForumPage'
import Home from '../pages/Home'
import MainLayout from '../layout/MainLayout'
import PostPage from '../pages/Forum/PostPage'
import socket from '../socket'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setAuthSuccess, setAccessToken, setLogout } from '../redux/slices/authSlice'
import { setUser } from '../redux/slices/userSlice'
import { refreshToken } from '../api/auth'
import LoadingScreen from '../components/LoadingScreen'
import Header from '../components/Header/Header'

const AppRoutes = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.userInfo?.user)
    const [isLoading, setIsLoading] = useState(true);

    const initAuth = async () => {
        const token = localStorage.getItem('access_token');
        if (token) {
            try {
                dispatch(setAccessToken(token));
                const res = await refreshToken();
                //console.log(res);
                const { access_token, user } = res.DT;
                dispatch(setAuthSuccess({ access_token }))
                dispatch(setAccessToken(access_token));
                dispatch(setUser(user));
                localStorage.setItem('access_token', access_token);
            } catch (err) {
                console.error('initAuth: refreshToken error:', err.message);

                if (err.response?.status === 401 || err.response?.status === 403) {
                    dispatch(setLogout());
                    dispatch(setUser(null));
                    localStorage.removeItem('access_token');
                }
            }
        }
        setIsLoading(false); // Đặt isLoading thành false khi xử lý xong
    }

    useEffect(() => {
        initAuth();
    }, [dispatch])

    // connect socket
    useEffect(() => {
        const handleEmitRoom = () => {
            if (user?.id) {
                socket.emit("join_room", `user_${user.id}`);
                console.log(`✅ Join room: user_${user.id}`);
            }
        };

        socket.on('connect', handleEmitRoom);

        return () => {
            socket.off('connect', handleEmitRoom);
            //socket.disconnect();
        };
    }, [user?.id]);//gọi lại kết nối socket mỗi khi user ĐÃ ĐƯỢC lưu trong redux

    if (isLoading) {
        return <LoadingScreen />; //giữ màn hình tải khi auth chưa xử lý xong
    }

    return (
        <>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />

                    {/* Forum section */}
                    <Route path="forum">
                        <Route index element={<ForumPage />} />
                        <Route path="posts/:postId" element={<PostPage />} />
                    </Route>
                </Route>
            </Routes>

        </>
    )
}

export default AppRoutes
