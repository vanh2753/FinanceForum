import axios from "../axios"
const getDataForSection = async () => {
    const res = await axios.get('/topics/preview-section')
    return res.data
}

const getLatestApprovedPosts = async () => {
    const res = await axios.get('/posts/approved')
    return res.data
}

const getPostData = async (id) => {
    const res = await axios.get(`/posts/${id}`)
    return res.data
}

const createLikeForPost = async (id) => {
    const res = await axios.post(`/posts/${id}/like`);
    return res.data
}

const unlikeForPost = async (id) => {
    const res = await axios.delete(`/posts/${id}/unlike`);
    return res.data
}

const getTopicsList = async () => {
    const res = await axios.get('/topics')
    return res.data
}
const createNewPost = async (title, topicId, content, images) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("topic_id", topicId);
    formData.append("content", content);

    // Thêm từng ảnh vào formData 
    images.forEach((imgFile, index) => {
        formData.append("image_urls", imgFile); // backend phải dùng upload.array("images")
    });

    console.log(formData);
    const res = await axios.post("/posts", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
    });

    return res.data;
}

const updatePost = async (id, topic, title, content, oldImageLinks, newImageFiles) => {

    const formData = new FormData();
    formData.append('topic_id', topic);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image_urls', JSON.stringify(oldImageLinks)); //ép kiểu string cho mảng ảnh gốc
    newImageFiles.forEach(file => {
        formData.append('image_files', file);
    });

    const res = await axios.put(`/posts/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });
    return res.data
}

const deletePost = async (id) => {
    const res = await axios.delete(`/posts/${id}`)
    return res.data
}

export { getDataForSection, getLatestApprovedPosts, getPostData, createLikeForPost, unlikeForPost, createNewPost, getTopicsList, updatePost, deletePost }