import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../api/auth'
import { setAccessToken, setAuthSuccess } from '../../redux/slices/authSlice'
import { setUser } from '../../redux/slices/userSlice'
import { persistor } from '../../redux/store'

const LoginForm = (props) => {
    const { handleShowSignup } = props
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const dispatch = useDispatch()

    //const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault() //ko cho reload trang
        try {
            const data = { email, password }
            const res = await login(data);
            //console.log(res.DT.user)
            if (res.EC === 0) {
                dispatch(setAuthSuccess({ access_token: res.DT.access_token }));
                dispatch(setUser(res.DT.user))
                localStorage.setItem('access_token', res.DT.access_token)
                await persistor.flush();
            }
        } catch (err) {
            setEmailError("");
            setPasswordError("");
            const data = err.response?.data;

            if (data?.EC === 1 && data?.EM) {
                // joi validate
                if (data.EM.toLowerCase().includes("email")) setEmailError(data.EM);
                else if (data.EM.toLowerCase().includes("password")) setPasswordError(data.EM);
            }
            else if (data?.EC === 2 && data?.EM) {
                // account validate
                if (data.EM.toLowerCase().includes("email")) setEmailError(data.EM);
                else if (data.EM.toLowerCase().includes("mật khẩu")) setPasswordError(data.EM);
            }
        }
    }

    return (
        <div className="container mt-5">
            <div className="justify-content-center">
                <div className="col-lg-12">
                    <Form className="p-4 border rounded" onSubmit={handleSubmit}>
                        <h2 className="text-center mb-4">Đăng nhập</h2>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder='Email'
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
                                placeholder='Mật khẩu'
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
                        <Button variant="primary" className="w-100 mb-3" type="submit">
                            Đăng nhập
                        </Button>

                        <div className="text-center">
                            <span>Bạn chưa có tài khoản? </span>
                            <Button className="btn btn-primary mb-1" onClick={handleShowSignup}>
                                Đăng ký
                            </Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm
