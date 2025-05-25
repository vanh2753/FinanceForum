import { Modal, Button, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getTopicsList } from "../../../api/forum/post-api";
import { updatePost } from "../../../api/forum/post-api";
const EditPostForm = (props) => {

    const { show, handleClose, postData } = props

    const [topicsList, setTopicsList] = useState([]);
    const [topic, setTopic] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const [oldImageLinks, setOldImageLinks] = useState([]); // các ảnh gốc (link)
    const [newImageFiles, setNewImageFiles] = useState([]); // ảnh mới (files)

    const MAX_IMAGES = 5;

    const fetchTopicsList = async () => {
        const res = await getTopicsList();
        setTopicsList(res.DT);
    }

    useEffect(() => {
        fetchTopicsList()
    }, [])

    useEffect(() => {
        setTopic(postData.topic_id)
        setTitle(postData.title)
        setContent(postData.content)
        setOldImageLinks(postData.image_urls)
        setNewImageFiles([]);
    }, [])

    const handleImageChange = (e) => {
        const selected = Array.from(e.target.files);
        if (oldImageLinks.length + newImageFiles.length + selected.length > MAX_IMAGES) return;
        setNewImageFiles([...newImageFiles, ...selected]);
    };

    const handleRemoveOldImage = (index) => {
        const updated = [...oldImageLinks];
        updated.splice(index, 1);
        setOldImageLinks(updated);
    };

    const handleRemoveNewImage = (index) => {
        const updated = [...newImageFiles];
        updated.splice(index, 1);
        setNewImageFiles(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await updatePost(postData.id, topic, title, content, oldImageLinks, newImageFiles)
        if (res.EC === 0) {
            alert(res.EM);
            window.location.reload();
        }
        //handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title >Chỉnh sửa bài viết</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-white rounded">
                <Form className="border-secondary" onSubmit={handleSubmit}>
                    <Form.Group className="mb-2 w-50 border rounded">
                        <Form.Select
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="border-0"
                        >
                            <option value="">-- Chọn chủ đề --</option>
                            {topicsList.map((t) => (
                                <option key={t.id} value={t.id}>
                                    {t.title}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-2 w-50  border rounded">
                        <Form.Control
                            type="text"
                            placeholder="Tiêu đề bài viết"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border-0"
                        />
                    </Form.Group>

                    <Form.Group className="mb-2 position-relative border rounded">
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Nội dung bài viết"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="border-0"
                        />

                        <Form.Control
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            disabled={oldImageLinks.length + newImageFiles.length >= MAX_IMAGES}
                            className="d-none"
                            multiple
                        />
                    </Form.Group>

                    <label
                        htmlFor="image-upload"
                        className="d-inline-block mt-2 text-info"
                        style={{ fontSize: "0.9rem" }}
                    >
                        + Đính kèm ảnh (tối đa {MAX_IMAGES})
                    </label>

                    {(oldImageLinks.length > 0 || newImageFiles.length > 0) && (
                        <div className="mb-3 d-flex flex-wrap gap-2">
                            {oldImageLinks.map((url, index) => (
                                <div key={"old-" + index} className="position-relative">
                                    <img
                                        src={url}
                                        alt={`old-${index}`}
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        className="rounded"
                                    />
                                    <Button
                                        size="sm"
                                        className="position-absolute top-0 end-0 p-0 rounded-circle"
                                        onClick={() => handleRemoveOldImage(index)}
                                    >
                                        ×
                                    </Button>
                                </div>
                            ))}
                            {newImageFiles.map((file, index) => (
                                <div key={"new-" + index} className="position-relative">
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={`new-${index}`}
                                        style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                        className="rounded"
                                    />
                                    <Button
                                        size="sm"
                                        className="position-absolute top-0 end-0 p-0 rounded-circle"
                                        onClick={() => handleRemoveNewImage(index)}
                                    >
                                        ×
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button className="button button-primary" type="submit">
                        Cập nhật bài viết
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default EditPostForm