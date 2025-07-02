import { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { createProduct } from "../../api/expert-view/product-api";
import { getTopicsList } from "../../api/forum/post-api";
import { toast, ToastContainer } from "react-toastify";
import { Spinner } from "react-bootstrap";

const CreateProductForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [topicId, setTopicId] = useState("");
    const [language, setLanguage] = useState("");
    const [file, setFile] = useState(null);
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(null);

    const fetchTopics = async () => {
        const res = await getTopicsList();
        setTopics(res.DT);
    }

    useEffect(() => {
        fetchTopics();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        // Validate
        if (!title || !price || !topicId || !language || !file) {
            setIsLoading(false);
            return setError("Vui lòng nhập đầy đủ thông tin và chọn file PDF.");
        }

        if (file.type !== "application/pdf") {
            setIsLoading(false);
            return setError("Sai định dạng file, vui lòng chọn file PDF.");
        }

        try {
            const res = await createProduct(
                title,
                description,
                price,
                topicId,
                language,
                file,
            );

            if (res.EC === 0) {
                toast.success("Đăng tải sản phẩm mới thành công!");
                setIsLoading(false);
                setTitle("");
                setDescription("");
                setPrice("");
                setTopicId("");
                setLanguage("");
                setFile(null);
            } else {
                setIsLoading(false);
                setError(res.EM || "Có lỗi xảy ra.");
            }
        } catch (err) {
            setError("Lỗi kết nối hoặc hệ thống.");
        }
    };

    return (
        <div className="d-flex justify-content-center ">
            <div className="w-75 w-md-50 " >
                <h3 className="text-light mb-4 text-center">Đăng tải sản phẩm mới</h3>
                {error && <Alert variant="danger">{error}</Alert>}

                <Form onSubmit={handleSubmit} className="text-white">
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={6} // tăng chiều cao
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    {/* Chủ đề & Ngôn ngữ cùng hàng */}
                    <div className="row mb-3">
                        <div className="col">
                            <Form.Label>Chủ đề</Form.Label>
                            <Form.Select
                                value={topicId}
                                onChange={(e) => setTopicId(e.target.value)}
                            >
                                <option value="">-- Chọn chủ đề --</option>
                                {topics.map((topic) => (
                                    <option key={topic.id} value={topic.id}>
                                        {topic.title}
                                    </option>
                                ))}
                            </Form.Select>
                        </div>
                        <div className="col">
                            <Form.Label>Ngôn ngữ</Form.Label>
                            <Form.Select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="">-- Chọn ngôn ngữ --</option>
                                <option value="vietnamese">Tiếng Việt</option>
                                <option value="english">Tiếng Anh</option>
                            </Form.Select>
                        </div>
                    </div>

                    {/* File - Giá - Xác nhận cùng hàng */}
                    <div className="row align-items-end">
                        <div className="col-5">
                            <Form.Label>File PDF</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </div>
                        <div className="col-3">
                            <Form.Label>
                                Giá <span className="">(tối đa 100$)</span>
                            </Form.Label>
                            <Form.Control
                                type="number"
                                min="0"
                                step="0.01" //giúp nhập float
                                max={100}
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="col-4">
                            <Button type="submit" className="w-100 mt-3" variant="primary">
                                Xác nhận
                            </Button>
                        </div>
                    </div>
                </Form>
                <ToastContainer position="top-center" autoClose={3000} />
            </div>
            {isLoading && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        backgroundColor: "rgba(255,255,255,0.7)",
                        zIndex: 9999,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" style={{ width: "4rem", height: "4rem" }} />
                        <div className="mt-3 fw-bold text-dark">Đang xử lý, vui lòng chờ...</div>
                    </div>
                </div>
            )}
        </div>

    )
}

export default CreateProductForm