const { Notification } = require('../models/index')

const getAllNotifications = async (req, res, next) => {
    try {
        const notifications = await Notification.findAll({
            where: { receiver_id: req.user.userId },
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json({
            EC: 0,
            EM: "Lấy thông báo người dùng thành công",
            DT: notifications
        })
    } catch (error) {
        next(error)
    }
}

const markAsRead = async (req, res, next) => {
    try {
        const notification = await Notification.findByPk(req.params.id)
        if (notification && notification.receiver_id === req.user.userId) {
            notification.is_read = true
            await notification.save()
            res.status(200).json({
                EC: 0,
                EM: "Thông báo này đã được đọc"
            })
        }
    } catch (error) {
        next(error)
    }
}

const markAllAsRead = async (req, res, next) => {
    try {
        await Notification.update(
            { is_read: true },
            { where: { receiver_id: req.user.userId } }
        )
        res.status(200).json({
            EC: 0,
            EM: "Tất cả thông báo đã được đọc"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllNotifications,
    markAsRead,
    markAllAsRead
}
