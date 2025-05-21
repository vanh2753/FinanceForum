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

const createLikeForPost = (id) => {
    const res = axios.post(`/posts/${id}/like`);
    return res.data
}

const unlikeForPost = (id) => {
    const res = axios.delete(`/posts/${id}/unlike`);
    return res.data
}

export { getDataForSection, getLatestApprovedPosts, getPostData, createLikeForPost, unlikeForPost }