import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { createOrder, createPaymentUrl } from '../../api/expert-view/order-api';

const ProductDetail = ({ product }) => {
    const { id, title, description, price, language, views, createdAt, Account = {} } = product;

    const handlePayment = async () => {
        try {
            // tạo order
            const order = await createOrder(id)
            const orderId = order?.DT?.id;

            // tạo url thanh toán của vnpay
            const res = await createPaymentUrl(orderId);
            const paymentUrl = res?.DT;
            if (paymentUrl) {
                window.location.href = paymentUrl; // chuển sang trang thanh toán của vnpay
            } else {
                alert("Thao tác thanh toán hiện đang lỗi.");
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-4 text-white" style={{ backgroundColor: '#1c2e4a' }}>
            <div className="row" style={{ backgroundColor: '#1c2e4a' }}>
                {/* Cột trái: thông tin phụ */}
                <div className=" col-md-4 d-flex flex-column gap-3">
                    <div className="d-flex align-items-center">
                        <span>Tác giả: </span>
                        <img
                            src={Account.avatar_url}
                            alt="avatar"
                            className="rounded-circle me-2"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                        />
                        <span className="fw-medium">{Account.username}</span>
                    </div>
                    <div className="">Ngôn ngữ: {language?.toUpperCase()}</div>
                    <div className="">Đã xem: {views}</div>
                    <div className="">
                        Ngày đăng: {new Date(createdAt).toLocaleDateString()}
                    </div>
                </div>

                {/* Cột phải: tiêu đề + mô tả */}
                <div className="col-md-8">
                    <h2 className="mb-3 mt-2" >
                        {title}
                    </h2>
                    <hr />
                    <p className="mt-2 " style={{ fontSize: '1.0rem', fontStyle: 'italic' }} >{description}</p>
                    {/* Dưới cùng: giá tiền + thanh toán */}
                    <div className=" mt-3 align-items-center  ">
                        <div className="g me-3 fs-3" style={{ color: '#ff6f00' }}>{price} VND</div>
                        <Button className='border-0 mb-3' style={{ backgroundColor: '#ff6f00' }} onClick={handlePayment}>Thanh toán</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
