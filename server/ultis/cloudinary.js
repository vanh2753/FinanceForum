const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadImage = async (buffer) => {
    try {
        // Convert buffer to base64 string
        const base64String = `data:image/jpeg;base64,${buffer.toString('base64')}`; // quy tắc phải thêm prefix data:image/jpeg;base64,
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

const uploadImages = async (buffers) => {
    try {
        const uploadPromises = buffers.map(buffer => {
            const base64String = `data:image/jpeg;base64,${buffer.toString('base64')}`;
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