import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { verifyCheckoutSession } from '../../api/expert-view/order-api';
import { Spinner } from 'react-bootstrap'

const PaymentSuccess = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const sessionId = searchParams.get("session_id");
    const productId = searchParams.get("product_id");
    const [verified, setVerified] = useState(false);
    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if (!sessionId) return;

                const res = await verifyCheckoutSession(sessionId);
                if (res?.EC === 0) {
                    setVerified(true);
                } else {
                    console.warn("Thanh toán chưa được xác thực:", res?.EM || res);
                }
            } catch (error) {
                console.error("Lỗi xác thực thanh toán:", error);
            }
        };

        verifyPayment();
    }, [sessionId]);

    useEffect(() => {
        if (verified) {
            const timer = setTimeout(() => {
                navigate(`/expert/products/${productId}`); // Quay lại ProductDetail
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [verified, navigate]);

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#0F172A' }}>
            <div className="text-white text-center">
                <div className="card bg-transparent text-white border-0 ">
                    <h2>Thanh toán thành công</h2>
                    <p>Cảm ơn bạn đã mua sản phẩm của chúng tôi.</p>
                    <p>Tự động trở về sau 3s.</p>
                    <div className="mt-4 d-flex justify-content-center">
                        <Spinner animation="border" variant="light" />
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PaymentSuccess



