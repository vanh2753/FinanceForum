import { IoNotificationsOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { getAllNotifications, markAllAsRead, markAsRead } from "../../api/forum/notification-api";
import socket from "../../socket";
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from "react-bootstrap/esm/Button";
import './bell.scss'
const NotificationBell = () => {
    const [notifications, setNotifications] = useState([])
    const { access_token, isAuthenticated } = useSelector((state) => state.auth);

    const hasUnread = notifications.some(noti => !noti.is_read); //check xem thông báo đã được đọc chưa ?

    useEffect(() => {
        if (!access_token || !isAuthenticated) return; // đợi token và auth có rồi mới gọi API
        fetchNotiList();
    }, [access_token]);

    const fetchNotiList = async () => {
        try {
            const notis = await getAllNotifications()
            setNotifications(notis.DT)
        } catch (error) {
            console.log("noti error >>", error)
        }

        //console.log(notis)
    }

    useEffect(() => {
        socket.on("new_comment", (data) => {
            setNotifications(prev => [data, ...prev]); // Thêm noti mới lên đầu
        });

        return () => {
            socket.off("new_comment");
        };
    }, []);

    const handleMarkAsRead = async (id) => {
        const res = await markAsRead(id)
        if (res.EC === 0) {
            //console.log("da doc")
        }
    }

    const handleMarkAllRead = async () => {
        const res = await markAllAsRead()
        if (res.EC === 0) {
            // Cập nhật trạng thái tất cả thành đã đọc
            setNotifications((prev) =>
                prev.map((noti) => ({ ...noti, is_read: true }))
            );
        }
    }

    return (
        <div >

            <Dropdown onToggle={() => fetchNotiList()} >
                <Dropdown.Toggle className="bg-transparent border-0 position-relative">
                    <IoNotificationsOutline className="bell-icon" style={{ fontSize: "1.8rem" }} />
                    {
                        hasUnread &&
                        <span className="notification-dot position-absolute "></span>
                    }
                </Dropdown.Toggle>

                <Dropdown.Menu className="notification-bell" >
                    {
                        notifications.length === 0 ?
                            <div className="d-flex justify-content-center">
                                <span className="text-muted">Bạn không có thông báo nào</span>
                            </div>
                            :
                            <div className="d-flex justify-content-center">
                                <Button
                                    className="text-nowrap mark-all-btn"
                                    onClick={handleMarkAllRead}
                                >
                                    Đánh dấu tất cả đã đọc
                                </Button>
                            </div>

                    }
                    {
                        notifications.map((noti) => (
                            <Dropdown.Item className={`noti-item ${noti.is_read ? 'read' : 'unread'}`} //css class theo điều kiện
                                as={Link} to={`/forum${noti.link}`} key={noti.id}
                                onClick={() => {
                                    handleMarkAsRead(noti.id);
                                    fetchNotiList()
                                }}
                            >
                                <div className="noti-content"> {noti.content}</div>
                                <div className="noti-time text-muted">{new Date(noti.createdAt).toLocaleString()}</div>
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>

        </div >
    )
}

export default NotificationBell