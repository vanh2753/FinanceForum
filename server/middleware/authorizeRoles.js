
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) { // kiểm tra xem user có role trong mảng roles không
            return res.status(403).json({ message: 'Bạn không có quyền truy cập' })
        }
        next()
    }
}

module.exports = { authorizeRoles }
