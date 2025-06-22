import axios from '../axios'

const getProductList = async (page = 1, limit = 10) => {
    const res = await axios.get(`/products?page=${page}&limit=${limit}`);
    return res.data;
}

const getProductById = async (id) => {
    const res = await axios.get(`/products/${id}`);
    return res.data;
}

const getFilteredProducts = async (searchInput, author, language, page = 1, limit = 10) => {

    const params = new URLSearchParams(); //sử dụng để truyền biến theo điều kiện

    if (searchInput) params.append('searchInput', searchInput);
    if (author) params.append('author', author);
    if (language) params.append('language', language);
    params.append('page', page);
    params.append('limit', limit);

    const res = await axios.get(`/products/search?${params.toString()}`);
    return res.data;
};

const createProduct = async (title, description, price, topicId, language, file) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("topic_id", topicId);
    formData.append("language", language);
    formData.append("file_url", file);

    const res = await axios.post("/products", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return res.data;
}

const getMyProducts = async (page = 1, limit = 10) => {
    const res = await axios.get(`/products/my-products?page=${page}&limit=${limit}`);
    return res.data;
}

const deleteProduct = async (id) => {
    const res = await axios.delete(`/products/${id}`);
    return res.data;
}

export { getProductList, getProductById, getFilteredProducts, createProduct, getMyProducts, deleteProduct }