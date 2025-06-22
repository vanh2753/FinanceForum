import { Nav } from 'react-bootstrap'
import './header.scss'
import { useState } from 'react'
import AuthModal from '../Auth/AuthModal'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../../redux/slices/authSlice'
import { setUser } from '../../redux/slices/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import NotificationBell from '../Notification/NotificationBell'
import defaultAvatar from '../../assets/images/default-avatar.png'
import { NavLink } from 'react-router-dom'
import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
    const [show, setShow] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isAuthenticated, access_token } = useSelector((state) => state.auth); //check đăng nhập hay chưa, mặc định là false
    const user = useSelector(state => state.userInfo?.user)
    // ?. là để tránh lỗi khi chưa đăng nhập (giá trị undefined được React chấp nhận cho render, nếu không sẽ báo can't read property)

    const handleLogout = () => {
        dispatch(setLogout())
        dispatch(setUser(null))
        localStorage.removeItem('access_token');
        navigate('/')
    }

    //chưa đăng nhập thì không hiển thị modal (trạng thái guest)
    useEffect(() => {
        if (!isAuthenticated) {
            setShow(false)
        }
    }, [isAuthenticated]) //isAuthenticated thay đổi thì sẽ chạy useEffect tránh bug tự động hiển thị modal khi chưa đăng nhập

    return (
        <div className="header-container container mb-3">
            <div className="row py-3 ">
                <div className=" home-tabs col-12 col-lg-8 d-flex ">
                    <NavLink to="/" end className="tab-link align-items-center">
                        Trang chủ
                    </NavLink>
                    <NavLink to="/forum" className="tab-link">
                        Diễn đàn
                    </NavLink>
                    <NavLink to="/news" className="tab-link">
                        Tin tức
                    </NavLink>
                    <NavLink to="/expert" className="tab-link">
                        Góc nhìn chuyên gia
                    </NavLink>
                </div>
                {isAuthenticated === false || !user ? (
                    <div className="btn-group col-12 col-lg-4 shadow-lg rounded-2 d-flex justify-content-end ">
                        <button className="btn btn btn-info " onClick={() => setShow(true)}>Đăng nhập</button>
                        {show && <AuthModal show={show} setShow={setShow} />}
                    </div>
                ) : (
                    // phải viết điều kiện check user để tránh bug khi chưa đăng nhập
                    user && (
                        <div className='user-info col-lg-4 d-flex justify-content-center align-items-center'>
                            <img src={user.avatar_url || defaultAvatar} alt="avatar" />
                            <span className='text-truncate'>{user.username}</span>
                            <NotificationBell className='me-1' />
                            <Link to='my-account'><IoSettingsOutline style={{ fontSize: "1.8rem", color: "white" }} /></Link>
                            <button className='btn btn-secondary btn-logout' onClick={handleLogout}>Đăng xuất</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Header
