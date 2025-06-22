import axios from './axios';

const findUserByEmail = async (email) => {
    console.log(email);
    const res = await axios.post(`/user/find-by-email`, { email });
    return res.data;
}

const assignExpert = async (userId) => {
    const res = await axios.put(`/user/${userId}/assign-expert`);
    return res.data;
}

const createModAccount = async (data) => {
    //console.log(data)
    const { email, password, username } = data;
    const res = await axios.post('/user/create-mod', { email, password, username });
    return res.data
}

const getModList = async () => {
    const res = await axios.get('/user/get-mod-list')
    return res.data
}

const updateAvatar = async (avatarFile) => {
    const formData = new FormData();
    formData.append('avatar_url', avatarFile);
    const res = await axios.put('/user/avatar', formData);
    return res.data
}

const updatePassword = async (oldPassword, newPassword) => {
    const res = await axios.put('/user/password', { oldPassword, newPassword });
    return res.data
}

const updateUsername = async (username) => {
    const res = await axios.put('/user/username', { username });
    return res.data
}

const getMyOrder = async () => {
    const res = await axios.get(`/orders/my-orders`)
    return res.data
}

const getMyPosts = async () => {
    const res = await axios.get(`/posts/my-posts`)
    return res.data
}

export { findUserByEmail, assignExpert, createModAccount, getModList, updateAvatar, updatePassword, updateUsername, getMyOrder, getMyPosts };