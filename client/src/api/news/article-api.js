import axios from "../axios"

const uploadArticleImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
        const res = await axios.post("/articles/upload-image", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        console.log("Upload response:", res.data);
        return res.data.location; // TinyMCE yêu cầu
    } catch (error) {
        throw new Error("Image upload failed");
    }
}

const createArticle = async (title, content) => {
    const res = await axios.post("/articles", { title, content });
    return res.data;

}

const getAllNews = async () => {
    const res = await axios.get("/articles/all-news");
    return res.data;
}

const getArticleById = async (id) => {
    const res = await axios.get(`/articles/${id}`)
    return res.data
}
export { uploadArticleImage, createArticle, getAllNews, getArticleById }