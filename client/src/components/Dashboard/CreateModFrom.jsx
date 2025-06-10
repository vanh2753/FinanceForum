import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createModAccount } from "../../api/user-api";
import { toast, ToastContainer } from "react-toastify";

const CreateModForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await createModAccount({ email, password, username });
        if (res.EC === 0) {
            toast.success("Tạo tài khoản thành công!");
            setEmail("");
            setPassword("");
            setUsername("");
        } else {
            toast.error(res.EM || "Tạo tài khoản thất bại.");
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className="p-4 border rounded" style={{ maxWidth: "500px" }}>
                <h4 className="mb-4">Tạo tài khoản Moderator</h4>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Nhập email"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mật khẩu</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Nhập mật khẩu"
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Tên người dùng</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nhập tên người dùng"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Tạo tài khoản
                </Button>
            </Form>
            <ToastContainer position="top-center" autoClose={3000} />
        </>
    );
};

export default CreateModForm;
