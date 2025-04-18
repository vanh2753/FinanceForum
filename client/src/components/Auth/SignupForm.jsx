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
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault() //ko cho reload trang
        const data = { email, password, username, avatar }
        const res = await signup(data)
        if (res.EC === 0) {
            handleShowLogin() //đổi sang form login
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
                    <Form className="p-4 border rounded">
                        <h2 className="text-center mb-4">Đăng ký</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tên người dùng</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên người dùng"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </Form.Group>

                        {/* Avatar Upload and Preview */}
                        <Form.Label>Tải ảnh đại diện</Form.Label>
                        <div className="text-center mb-4">
                            <div className="position-relative d-inline-block">
                                <Image
                                    src={previewImage}
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover', //giúp ảnh không bị biến dạng
                                    }}
                                />
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    /* class giúp cho nút up ảnh nằm trên và chiếm toàn bộ kích thước ảnh*/
                                    className="position-absolute top-0 w-100 h-100 opacity-0"
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>

                        <Button variant="primary" className="w-100 mb-3" onClick={handleSubmit}>
                            Đăng ký
                        </Button>

                        <div className="text-center">
                            <span>Đã có tài khoản? </span>
                            <Button className="btn btn-primary " onClick={handleShowLogin}>
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
