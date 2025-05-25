import React, { useState } from "react";
import { Modal, Button, Spinner } from "react-bootstrap";
import { useNavigate } from 'react-router-dom'
import { deletePost } from '../../../api/forum/post-api'
const DeleteModal = (props) => {
    const { show, handleClose, data, type } = props
    const navigate = useNavigate()

    let objectDeleting = ''
    switch (type) {
        case 'post':
            objectDeleting = 'bài viết'
    }
    const handleDelete = async () => {
        switch (type) {
            case 'post':
                const res = await deletePost(data.id)
                if (res.EC === 0) {
                    navigate('/forum')
                }
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