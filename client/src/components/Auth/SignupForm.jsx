import { Form, Button, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import imgPlaceholder from '../../assets/images/img-placeholder.png'
import { useDispatch } from 'react-redux'
import { signup } from '../../api/auth'
import { useNavigate } from 'react-router-dom'
const SignupForm = (props) => {
    const { handleShowLogin } = props
    const [previewImage, setPreviewImage] = useState(imgPlaceholder)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [emailError, setEmailError] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault() //ko cho reload trang
        setEmailError("");
        setUsernameError("");
        setPasswordError("");
        try {
            const data = { email, password, username, avatar }
            const res = await signup(data)
            if (res.EC === 0) {
                handleShowLogin() //đổi sang form login
            }
        } catch (err) {
            const data = err.response?.data;

            if (err.response?.data?.EC === 2) {
                // Email đã tồn tại
                setEmailError("Email đã tồn tại");
            } else if (err.response?.data?.EM) {
                if (data.EM.toLowerCase().includes("email")) setEmailError(data.EM);
                else if (data.EM.toLowerCase().includes("password")) setPasswordError(data.EM);
                else if (data.EM.toLowerCase().includes("username")) setUsernameError(data.EM);
            } else {
                setError("Đã xảy ra lỗi, vui lòng thử lại sau.");
            }
        }
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0] //lấy file được upload
        if (file) {
            setPreviewImage(URL.createObjectURL(file)) //đổi ảnh preview thành ảnh được upload
            setAvatar(file)
        }
    }

    return (
        <div className="container mt-5">
            <div className="justify-content-center">
                <div className="col-lg-12">
                    <Form className="p-4 border rounded" onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">Đăng ký</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setEmailError("");
                                }}
                                isInvalid={!!emailError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {emailError}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                isInvalid={!!passwordError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {passwordError}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    setUsernameError("");
                                }}
                                isInvalid={!!usernameError}
                            />
                            <Form.Control.Feedback type="invalid">
                                {usernameError}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Label>Tải ảnh đại diện</Form.Label>
                        <div className="text-center mb-4">
                            <div className="position-relative d-inline-block">
                                <Image
                                    src={previewImage}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover',
                                    }}
                                />
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="position-absolute top-0 w-100 h-100 opacity-0"
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>

                        <Button variant="primary" className="w-100 mb-3" type="submit">
                            Đăng ký
                        </Button>

                        <div className="text-center">
                            <span>Đã có tài khoản? </span>
                            <Button className="btn btn-primary" onClick={handleShowLogin}>
                                Đăng nhập
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SignupForm
