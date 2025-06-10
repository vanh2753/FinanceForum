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

export { findUserByEmail, assignExpert, createModAccount, getModList };