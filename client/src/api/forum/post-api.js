import axios from "../axios"
const getDataForSection = async () => {
    const res = await axios.get('/topics/preview-section')
    return res.data
}

const getLatestApprovedPosts = async (page = 1, limit = 5) => {
    const res = await axios.get(`/posts/approved?page=${page}&limit=${limit}`)
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

    //console.log(formData);
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

const getAllPosts = async (page = 1, limit = 10) => {
    const res = await axios.get(`/posts?page=${page}&limit=${limit}`)
    return res.data
}

const approvePostForMod = async (id) => {
    const res = await axios.patch(`/posts/${id}/approve`)
    return res.data
}

const getSearchPostsResult = async (searchInput, page = 1, limit = 10) => {
    const res = await axios.get(`/posts/search?searchInput=${encodeURIComponent(searchInput)}&page=${page}&limit=${limit}`);
    return res.data;
}

const getTrendingPosts = async () => {
    const res = await axios.get(`/posts/trending-posts`);
    return res.data;
}

const createNewTopic = async (title, description) => {
    const res = await axios.post('/topics', { title, description })
    return res.data
}
const updateTopic = async (topicId, title, description) => {
    const res = await axios.put(`/topics/${topicId}`, { title, description })
    return res.data
}

const deleteTopic = async (topicId) => {
    const res = await axios.delete(`/topics/${topicId}`)
    return res.data
}

export {
    getDataForSection,
    getLatestApprovedPosts,
    getPostData,
    createLikeForPost,
    unlikeForPost,
    createNewPost,
    getTopicsList,
    updatePost,
    deletePost,
    getAllPosts,
    approvePostForMod,
    getSearchPostsResult,
    getTrendingPosts,
    updateTopic,
    deleteTopic,
    createNewTopic
}