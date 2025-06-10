import { useState } from "react";
import { Button, Form, Modal, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { findUserByEmail, assignExpert } from "../../api/user-api";
import { FaSearch } from "react-icons/fa";
const AssignExpertPanel = () => {
    const [email, setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await findUserByEmail(email);
            if (res.EC === 0) {
                setUser(res.DT);
                setShowModal(true);
            } else {
                toast.error(res.EM);
                setUser(null);
            }
        } catch (error) {
            toast.error("Lỗi khi tìm người dùng");
        }
    };

    const handleAssignExpert = async () => {
        try {
            const res = await assignExpert(user.id);
            if (res.EC === 0) {
                toast.success("Đã cấp quyền chuyên gia thành công", {
                    style: {
                        backgroundColor: "#f0f0f0",
                        color: "black",
                        fontStyle: "italic",
                        padding: "10px",
                        width: "auto",
                    },
                });
                setShowModal(false);
                setEmail("");
            } else {
                toast.error(res.EM);
            }
        } catch (error) {
            toast.error("Lỗi khi cấp quyền chuyên gia");
        }
    };

    return (
        <div className="d-flex justify-content-center ">
            <Card className="p-4" style={{ width: "400px" }}>
                <h5 className="mb-3 text-center">Cấp quyền chuyên gia</h5>
                <Form onSubmit={handleSearch}>
                    <Form.Group controlId="email">
                        <Form.Label>Nhập email người dùng</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Nhập email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-3 ">
                        <Button type="submit" variant="primary" className="px-4 align-items-center" >
                            <FaSearch className="me-1" />
                            Tìm
                        </Button>
                    </div>
                </Form>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {user && (
                        <div className="text-center">
                            <img
                                src={user.avatar_url}
                                alt="avatar"
                                className="rounded-circle mb-3"
                                style={{ width: "200px", height: "200px", objectFit: "cover" }}
                            />
                            <h5>{user.username}</h5>
                            <p className="text-muted mb-3">{user.email}</p>
                            <p style={{ fontStyle: "italic" }}>
                                Quyền chuyên gia: {user.isExpert ? "Đã là chuyên gia" : "Chưa được cấp"}
                            </p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowModal(false)}
                    >
                        Đóng
                    </Button>
                    <Button
                        variant="success"
                        onClick={handleAssignExpert}
                        disabled={user?.isExpert}
                    >
                        {user?.isExpert ? "Đã cấp quyền" : "Cấp quyền chuyên gia"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AssignExpertPanel;
