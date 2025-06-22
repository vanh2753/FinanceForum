import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { createOrder, createPaymentSession, checkIfPurchased } from '../../api/expert-view/order-api';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const ProductDetail = ({ product }) => {
    const { id, title, description, price, language, views, createdAt, Account = {} } = product;
    const [hasPurchased, setHasPurchased] = useState(false);
    const user = useSelector((state) => state.userInfo.user);

    const handlePayment = async () => {
        try {
            // tạo order
            const order = await createOrder(id)
            const orderId = order?.DT?.id;
            const product = { id, title, price }

            const res = await createPaymentSession(orderId, product)
            window.location.href = res.url

        } catch (error) {
            console.log(error);
        }
    };

    const handleCheckIfPurchased = async () => {
        const res = await checkIfPurchased(id)
        if (res.EC === 0) {
            setHasPurchased(true)
        }
    }

    useEffect(() => {
        if (user && product?.id) handleCheckIfPurchased();
    }, [user, product]);

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
                    <div className="">Lượt tải về: {views}</div>
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
                        <div className="g me-3 fs-3" style={{ color: '#ff6f00' }}>{price} $</div>
                        {!hasPurchased ? (
                            <Button className='border-0 mb-3' style={{ backgroundColor: '#ff6f00' }} onClick={handlePayment}>
                                Thanh toán
                            </Button>
                        ) : (
                            <a
                                href={product.file_url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-success mb-3"
                            >
                                Tải file
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
