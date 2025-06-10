import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { createNewPost, getTopicsList } from "../../../api/forum/post-api";
import { toast, ToastContainer } from "react-toastify";

const MAX_IMAGES = 5;

const CreatePostForm = () => {
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [topic, setTopic] = useState("");
    const [images, setImages] = useState([]);
    const [topicsList, setTopicsList] = useState([]);

    const fetchTopics = async () => {
        const res = await getTopicsList();
        setTopicsList(res.DT);
    }
    useEffect(() => {
        fetchTopics();
    }, []);

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); //chuyển files sang Array để sử dụng các method
        const newImages = [...images, ...files].slice(0, MAX_IMAGES);
        setImages(newImages);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = [...images]; //phải thao tác với clone 
        updatedImages.splice(index, 1); //xóa ảnh theo index
        setImages(updatedImages);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await createNewPost(title, topic, content, images)

        if (res.EC === 0) {
            toast.success("Bài viết đã được đăng tải, vui lòng chờ xét duyệt!", {
                style: {
                    whiteSpace: "nowrap",
                    color: "black",
                    fontStyle: "italic",
                    minWidth: "400px",
                },
            });
            setTitle("");
            setTopic("");
            setContent("");
            setImages([]);
        }
    };

    return (
        <div className="bg-dark text-white p-3 rounded mb-4">
            <h3 className=" text-light mb-4">Tạo bài viết của bạn</h3>
            {/* topics dropdown */}
            <Form.Group className="mb-2 w-50">
                <Form.Select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)} //lấy value là topicId
                    className=" border-0"
                >
                    <option value="">-- Chọn chủ đề --</option>
                    {topicsList.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                            {topic.title}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            {/* Title Input */}
            <Form.Group className="mb-2 w-50">
                <Form.Control
                    type="text"
                    placeholder="Tiêu đề bài viết"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className=" border-0"
                />
            </Form.Group>

            {/* Textarea + upload ảnh */}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2 position-relative">
                    <Form.Control
                        as="textarea"
                        rows={10}
                        placeholder="Nội dung bài viết"
                        value={content}
                        onChange={handleContentChange}
                        className="border-0  overflow-y-auto resize-none"
                    />

                    {/* Label đóng vai trò nút upload ảnh */}
                    <label
                        htmlFor="image-upload"
                        className="d-inline-block mt-2 text-info"
                        style={{ fontSize: "0.9rem" }}
                    >
                        + Đính kèm ảnh (tối đa {MAX_IMAGES})
                    </label>

                    {/* Hidden input button */}
                    <Form.Control
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={images.length >= MAX_IMAGES}
                        className="d-none"
                    />
                </Form.Group>

                {/* Ảnh đã chọn */}
                {images.length > 0 && (
                    <div className="mb-3 d-flex flex-wrap gap-2">
                        {images.map((file, index) => (
                            <div key={index} className="position-relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`preview-${index}`}
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                    className="rounded"
                                />
                                <Button
                                    size="sm"
                                    className="position-absolute top-0 end-0 p-0 rounded-circle"
                                    onClick={() => handleRemoveImage(index)}
                                >
                                    ×
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                <Button variant="primary" type="submit">
                    Đăng bài
                </Button>
            </Form>
            {/* Form của bạn */}
            <ToastContainer position="top-center" autoClose={3000} />
        </div>
    );
};

export default CreatePostForm;
