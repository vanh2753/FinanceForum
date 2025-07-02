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

const createLikeForComment = async (id) => {
    const res = await axios.post(`/comments/${id}/like`);
    return res.data
}

const unlikeForComment = async (id) => {
    const res = await axios.delete(`/comments/${id}/unlike`);
    return res.data
}

const updateComment = async (id, content) => {
    const res = await axios.put(`/comments/${id}`, { content });
    return res.data
}

const deleteComment = async (id) => {
    const res = await axios.delete(`/comments/${id}`);
    return res.data
}
export { getCommentData, createComment, createLikeForComment, unlikeForComment, updateComment, deleteComment }