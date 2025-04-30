const { Topic } = require('../models/index')

const createTopic = async (req, res, next) => {
    try {
        const { title, description } = req.body

        if (!title) {
            return res.status(400).json({
                EM: 'Vui lòng nhập tên topic',
                EC: 1,

            })
        }

        const topic = await Topic.create({ title, description })
        return res.status(201).json({
            EM: 'Tạo topic thành công',
            EC: 0,
            DT: topic
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {
    createTopic
}
