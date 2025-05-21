import axios from "../axios";

const getAllNotifications = async () => {
    const res = await axios.get('/notifications')
    return res.data
}

const markAsRead = async (id) => {
    const res = await axios.patch(`/notifications/${id}/read`)
    return res.data
}

const markAllAsRead = async () => {
    const res = await axios.patch('/notifications/read-all')
    return res.data
}

export { getAllNotifications, markAsRead, markAllAsRead }