// src/components/Dashboard/TopicCRUDPanel.jsx
import { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { getTopicsList, updateTopic, deleteTopic, createNewTopic } from '../../api/forum/post-api';

const TopicPanel = () => {
    const [topics, setTopics] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingTopic, setEditingTopic] = useState(null);

    const fetchTopics = async () => {
        try {
            const res = await getTopicsList();
            setTopics(res.DT);
        } catch (error) {
            console.error("Failed to fetch topics", error);
        }
    };

    useEffect(() => {
        fetchTopics();
    }, []);

    const handleShowAdd = () => {
        setEditingTopic(null);
        setTitle("");
        setDescription("");
        setShowModal(true);
    };

    const handleShowEdit = (topic) => {
        setEditingTopic(topic);
        setTitle(topic.title);
        setDescription(topic.description);
        setShowModal(true);
    };

    const handleDelete = async (topicId) => {
        if (window.confirm("Bạn có chắc muốn xóa topic này?")) {
            try {
                await deleteTopic(topicId); // Gọi từ API bạn đã tạo
                fetchTopics();
            } catch (error) {
                console.error("Failed to delete topic", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTopic) {
                await updateTopic(editingTopic.id, title, description);
            } else {
                await createNewTopic(title, description);
            }
            setShowModal(false);
            fetchTopics();
        } catch (error) {
            console.error("Failed to save topic", error);
        }
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5>Quản lý Topic</h5>
                <Button onClick={handleShowAdd}>+ Thêm Topic</Button>
            </div>

            <Table bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tiêu đề</th>
                        <th>Mô tả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {topics.map((topic, index) => (
                        <tr key={topic.id}>
                            <td>{index + 1}</td>
                            <td>{topic.title}</td>
                            <td>{topic.description}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => handleShowEdit(topic)}
                                >
                                    Sửa
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(topic.id)}
                                >
                                    Xóa
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {editingTopic ? "Chỉnh sửa Topic" : "Thêm Topic mới"}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Mô tả</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Hủy
                        </Button>
                        <Button type="submit" variant="primary">
                            Lưu
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default TopicPanel;
