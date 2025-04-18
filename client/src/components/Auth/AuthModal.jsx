import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthModal = (props) => {
    const { show, setShow } = props
    const handleClose = () => setShow(false);
    const [showSignup, setShowSignup] = useState(false)

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
