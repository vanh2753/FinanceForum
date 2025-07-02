import { Modal, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { updateComment } from "../../../api/forum/comment-api";

const EditCommentForm = ({ show, handleClose, commentData }) => {
    const [content, setContent] = useState(commentData.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateComment(commentData.id, content);
        handleClose();
        window.location.reload(); // hoặc refetch nếu dùng SWR/react-query
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh sửa bình luận</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Nội dung</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Huỷ</Button>
                    <Button type="submit" variant="primary">Lưu</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditCommentForm;
