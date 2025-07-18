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
    const { username, email, password } = req.body
    try {
        const { error } = signupSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ EM: error.details[0].message }) // error.details[0].message là message của error  
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash password

        // let finalAvatarUrl = avatar_url;
        // if (req.file) {
        //     try {
        //         finalAvatarUrl = await uploadImage(req.file.buffer);
        //     } catch (uploadError) {
        //         console.error('Lỗi khi tải lên ảnh đại diện:', uploadError);
        //         return res.status(400).json({
        //             EM: 'Lỗi khi tải lên ảnh đại diện',
        //             EC: 1
        //         });
        //     }
        // }

        const user = await Account.create({ username, email, password: hashedPassword, role: 'mod' })
        return res.status(201).json({
            EM: 'Tạo tài khoản Mod thành công',
            EC: 0,
            DT: user
        })
    } catch (error) {
        next(error)
    }
}

const assignExpertRole = async (req, res, next) => {
    try {
        const { id } = req.params

        const account = await Account.findByPk(id)

        if (!account) {
            return res.status(404).json({
                EC: 1,
                EM: "Tài khoản không tồn tại"
            })
        }

        account.isExpert = true;
        await account.save();

        res.status(200).json({
            EC: 0,
            EM: "Cấp quyền chuyên gia thành công",
            DT: {
                id: account.id,
                username: account.username,
                email: account.email,
                isExpert: account.isExpert
            }
        })
    } catch (error) {

    }
}

const getAllUser = async (req, res, next) => {
    try {
        const users = await Account.findAll()
        res.status(200).json({
            EM: 'Lấy danh sách người dùng thành công',
            EC: 0,
            DT: users
        })
    } catch (error) {
        next(error)
    }
}

const getUserByEmail = async (req, res, next) => {
    try {
        const email = req.body.email;

        const user = await Account.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({
                EM: "Tài khoản không tồn tại",
                EC: 1
            })
        }

        res.status(200).json({
            EM: "Lấy thống tin người dùng thành công",
            EC: 0,
            DT: user
        })
    } catch (error) {
        next(error)
    }
}

const getModList = async (req, res, next) => {
    try {
        const modList = await Account.findAll({
            where: { role: 'mod' },
            attributes: ['username', 'email', 'avatar_url', 'createdAt'],
            order: [['createdAt', 'DESC']],
        })
        res.status(200).json({
            EM: 'Lấy danh sách mod',
            EC: 0,
            DT: modList
        })
    } catch (error) {
        next(error)
    }
}

const updateUsername = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { username } = req.body;

        if (!username) return res.status(400).json({ message: "Thiếu username" });

        await Account.update({ username }, { where: { id: userId } });
        res.json({ message: "Cập nhật username thành công", username });
    } catch (error) {
        next(error)
    }
}

const updatePassword = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword)
            return res.status(400).json({ message: "Thiếu mật khẩu cũ hoặc mới" });

        const user = await Account.findByPk(userId);
        const match = await bcrypt.compare(oldPassword, user.password);

        if (!match) return res.status(401).json({ message: "Mật khẩu cũ không đúng" });

        const hashed = await bcrypt.hash(newPassword, 10);
        await Account.update({ password: hashed }, { where: { id: userId } });

        res.json({ message: "Đổi mật khẩu thành công" });
    } catch (error) {
        next(error)
    }
}

const updateAvatar = async (req, res, next) => {
    try {
        const userId = req.user.userId;

        let finalAvatarUrl;

        if (req.file) {
            try {
                finalAvatarUrl = await uploadImage(req.file); // Upload Cloudinary
            } catch (uploadError) {
                console.error("Lỗi khi tải lên ảnh đại diện:", uploadError);
                return res.status(400).json({
                    message: "Lỗi khi tải lên ảnh đại diện",
                });
            }
        } else {
            return res.status(400).json({
                message: "Chưa chọn file ảnh",
            });
        }

        await Account.update({ avatar_url: finalAvatarUrl }, { where: { id: userId } });

        res.json({
            message: "Cập nhật avatar thành công",
            avatar_url: finalAvatarUrl,
        });
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getUser,
    createModAccount,
    assignExpertRole,
    getAllUser,
    getUserByEmail,
    getModList,
    updateUsername,
    updatePassword,
    updateAvatar
}
