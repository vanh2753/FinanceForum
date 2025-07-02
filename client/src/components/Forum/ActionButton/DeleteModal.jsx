import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../../../api/forum/post-api'
import { deleteComment } from '../../../api/forum/comment-api'
const DeleteModal = (props) => {
    const { show, handleClose, data, type } = props
    const navigate = useNavigate()

    let objectDeleting = ''
    switch (type) {
        case 'post':
            objectDeleting = 'bài viết';
            break;
        case 'comment':
            objectDeleting = 'bình luận';
            break;
    }
    const handleDelete = async () => {
        let res;

        switch (type) {
            case 'post':
                res = await deletePost(data.id);
                if (res.EC === 0) {
                    navigate('/forum');
                }
                break;

            case 'comment':
                res = await deleteComment(data.id);
                console.log(res);
                if (res.EC === 0) {
                    window.location.reload();
                }
                break;
        }
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="text-danger">Xác nhận xoá</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc muốn xoá {objectDeleting}{" "}
                <strong>{data?.title || data?.name || "này"}</strong> không?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >
                    Huỷ
                </Button>
                <Button variant="danger" onClick={handleDelete} >
                    Xóa
                </Button>
            </Modal.Footer>
        </Modal>
    );
};


export default DeleteModal