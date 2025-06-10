import { Navbar, Container, Button, Image } from "react-bootstrap";
import defaultAvatar from "../../assets/images/default-avatar.png";
const HeaderDashboard = ({ user }) => {
    return (
        <Navbar bg="light" className="shadow-sm">
            <Container fluid className="px-4 d-flex align-items-center">
                <div className="fw-bold">MAIN DASHBOARD</div>
                <div className="d-flex align-items-center gap-3">
                    <Button variant="outline-primary" size="sm" href="/">
                        Trang chủ diễn đàn
                    </Button>
                    <div className="d-flex align-items-center gap-2">
                        <Image
                            src={user?.avatar_url || defaultAvatar}
                            roundedCircle
                            width="32"
                            height="32"
                            alt="avatar"
                        />
                        <div className="fw-medium">{user?.username}</div>
                    </div>
                </div>
            </Container>
        </Navbar>
    );
};

export default HeaderDashboard;
