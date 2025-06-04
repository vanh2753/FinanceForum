import axios from '../axios'

const getProductList = async (page = 1, limit = 10) => {
    const res = await axios.get(`/products?page=${page}&limit=${limit}`);
    return res.data;
}

const getProductById = async (id) => {
    const res = await axios.get(`/products/${id}`);
    return res.data;
}

export { getProductList, getProductById }