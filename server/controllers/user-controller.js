
const getUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const user = await getUserByToken(token)
        res.status(200).json({
            EM: 'Lấy thông tin người dùng thành công',
            EC: 0,
            DT: {
                access_token: token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    avatar_url: user.avatar_url,
                }
            }
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUser
}
