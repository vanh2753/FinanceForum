const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (file) => {
    try {
        // Convert buffer to base64 string
        const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`; // quy tắc phải thêm prefix data:image/jpeg;base64,
        const result = await cloudinary.uploader.upload(base64String, {
            folder: 'forum',
            resource_type: 'auto'
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw new Error('Failed to upload image to Cloudinary');
    }
};

//multer sử dụng .array('image_urls', 5) nên files là mảng các object, không truy cập được buffer trực tiếp
const uploadImages = async (files) => {
    try {
        const uploadPromises = files.map(file => {
            const base64String = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`; // phải file.buffer để truy cập
            return cloudinary.uploader.upload(base64String, {
                folder: 'forum',
                resource_type: 'auto'
            });
        });
        const results = await Promise.all(uploadPromises);
        return results.map(result => result.secure_url);
    } catch (error) {
        throw new Error('Failed to upload images to Cloudinary');
    }
};

module.exports = { cloudinary, uploadImage, uploadImages };