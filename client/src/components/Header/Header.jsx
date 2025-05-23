import { Nav } from 'react-bootstrap'
import './header.scss'
import { useState } from 'react'
import AuthModal from '../Auth/AuthModal'
import { useSelector, useDispatch } from 'react-redux'
import { setLogout } from '../../redux/slices/authSlice'
import { setUser } from '../../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import NotificationBell from '../Notification/NotificationBell'
import defaultAvatar from '../../assets/images/default-avatar.png'

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
            <div className="row ">
                <div className="navbar-list col-12 col-lg-8">
                    <Nav justify variant="tabs" defaultActiveKey="/home">
                        <Nav.Item>
                            <Nav.Link href="/">Diễn đàn</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">Tin tức</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/">Góc nhìn Chuyên gia</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                {isAuthenticated === false || !user ? (
                    <div className="btn-group col-12 col-lg-2 shadow-lg rounded-2">
                        <button className="btn btn btn-info" onClick={() => setShow(true)}>Đăng nhập</button>
                        {show && <AuthModal show={show} setShow={setShow} />}
                    </div>
                ) : (
                    // phải viết điều kiện check user để tránh bug khi chưa đăng nhập
                    user && (
                        <div className='user-info col-lg-4 d-flex justify-content-center align-items-center'>
                            <NotificationBell className='me-3' />
                            <img src={user.avatar_url || defaultAvatar} alt="avatar" />
                            <span>{user.username}</span>
                            <button className='btn btn-secondary btn-logout' onClick={handleLogout}>Đăng xuất</button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default Header
