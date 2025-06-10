import axios from './axios'


const login = async (data) => {
    const res = await axios.post('/login', data)
    return res.data
}

const signup = async (data) => {
    //console.log(data)
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('username', data.username)
    formData.append('avatar_url', data.avatar)

    const res = await axios.post('/signup', formData)
    return res.data
}

const logout = async () => {
    const res = await axios.post('/logout')
    localStorage.removeItem('accessToken')
    return res.data
}

const refreshToken = async () => {
    const res = await axios.post('/refresh-token')
    return res.data
}

export { login, signup, logout, refreshToken }
