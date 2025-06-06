import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const AuthModal = (props) => {
    const { show, setShow } = props
    const handleClose = () => setShow(false);
    const [showSignup, setShowSignup] = useState(false)

    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated); // hoặc state.auth.authSuccess

    useEffect(() => {
        if (isLoggedIn && show) {
            setShow(false); // tự đóng modal khi login xong
        }
    }, [isLoggedIn, show]);

    const handleShowSignup = () => {
        setShowSignup(true)
    }

    const handleShowLogin = () => {
        setShowSignup(false)
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    {showSignup ?
                        <SignupForm handleShowLogin={() => handleShowLogin()} />
                        :
                        <LoginForm handleShowSignup={() => handleShowSignup()} />
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default AuthModal
