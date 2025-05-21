import axios from "../axios"
const getCommentData = async (postId, limit, offset) => {
    const res = await axios.get(`/posts/${postId}/comments`, {
        params: {
            limit,
            offset
        }
    })
    return res.data
}

const createComment = async (postId, content) => {
    const res = await axios.post(`/posts/${postId}/comments`, { content })
    return res.data
}

const createLikeForComment = (id) => {
    const res = axios.post(`/comments/${id}/like`);
    return res.data
}

const unlikeForComment = (id) => {
    const res = axios.delete(`/comments/${id}/unlike`);
    return res.data
}
export { getCommentData, createComment, createLikeForComment, unlikeForComment }