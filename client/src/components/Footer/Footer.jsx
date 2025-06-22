import { Container, Row, Col } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaRegCopyright } from "react-icons/fa";

const Footer = () => {
    return (
        <div style={{ backgroundColor: "#0F172A", color: "white", padding: "40px 0", marginTop: "50px", }}>
            <Container className="border-top pt-4">
                <Row>
                    <Col md={6} className="mb-4">
                        <h5>Thông tin liên hệ</h5>
                        <p className="mb-2">
                            <FaMapMarkerAlt className="me-2" />
                            123 Đường ABC, Quận XYZ, TP.HCM
                        </p>
                        <p className="mb-2">
                            <FaPhoneAlt className="me-2" />
                            (028) 1234 5678
                        </p>
                        <p className="mb-2">
                            <FaEnvelope className="me-2" />
                            support@doan.com
                        </p>
                    </Col>

                    <Col md={6} className="mb-4">
                        <h5>Về chúng tôi</h5>
                        <p>
                            Đây là dự án cá nhân phục vụ mục đích học tập và trình diễn.
                            Các chức năng như forum, tin tức, chuyên gia, và sản phẩm được phát triển độc lập.
                        </p>
                    </Col>
                </Row>

                <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />

                <div className="text-center mt-3">
                    <small>
                        <FaRegCopyright className="me-1" />
                        2025 Dự án tốt nghiệp. All rights reserved.
                    </small>
                </div>
            </Container>
        </div>
    );
};

export default Footer;
