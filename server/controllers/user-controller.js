const { signupSchema } = require('../validators/auth-validator')
const { Account } = require('../models/index')
const bcrypt = require('bcrypt');
const { uploadImage } = require('../ultis/cloudinary')

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

const createModAccount = async (req, res, next) => {
    const { username, email, password, avatar_url } = req.body
    try {
        const { error } = signupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ EM: error.details[0].message }) // error.details[0].message là message của error  
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash password

        let finalAvatarUrl = avatar_url;
        if (req.file) {
            try {
                finalAvatarUrl = await uploadImage(req.file.buffer);
            } catch (uploadError) {
                console.error('Lỗi khi tải lên ảnh đại diện:', uploadError);
                return res.status(400).json({
                    EM: 'Lỗi khi tải lên ảnh đại diện',
                    EC: 1
                });
            }
        }

        const user = await Account.create({ username, email, password: hashedPassword, avatar_url: finalAvatarUrl, role: 'mod' })
        return res.status(201).json({
            EM: 'Tạo tài khoản Mod thành công',
            EC: 0,
            DT: user
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getUser,
    createModAccount
}
