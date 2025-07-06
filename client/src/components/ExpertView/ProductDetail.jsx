import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { createOrder, createPaymentSession, checkIfPurchased } from '../../api/expert-view/order-api';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { FaCartShopping } from "react-icons/fa6"
import pdfIcon from '../../assets/images/PDF_file_icon.png'

const ProductDetail = ({ product }) => {
    const { id, title, description, price, language, views, createdAt, Account = {} } = product;
    const [hasPurchased, setHasPurchased] = useState(false);
    const user = useSelector((state) => state.userInfo.user);

    const languageMap = {
        vietnamese: 'Tiếng Việt',
        english: 'Tiếng Anh',
    }
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
        <div className="container mt-4 text-white bg-light" >
            <div className="row align-items-start" style={{ backgroundColor: '#1c2e4a' }}>
                {/* Cột trái: Thông tin phụ */}
                <div className="col-md-4 d-flex flex-column justify-content-between py-3 "  >
                    {/* Tác giả */}
                    <div className="text-center mb-4">
                        <img
                            src={Account.avatar_url}
                            alt="avatar"
                            className="rounded-circle mb-2"
                            style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                        />
                        <div className="fw-semibold">{Account.username}</div>
                    </div>


                    {/* Ngôn ngữ + lượt tải */}
                    <div className="d-flex justify-content-around text-center mb-4 " >
                        <div>
                            <div className="fs-5 fw-bold">Ngôn ngữ</div>
                            <div>{languageMap[language]}</div>
                        </div>
                        <div>
                            <div className="fs-5 fw-bold">Lượt tải</div>
                            <div>{views}</div>
                        </div>
                    </div>


                    <div className="text-center mb-2">
                        <img
                            src={pdfIcon} // hoặc link ảnh biểu tượng PDF
                            alt="PDF"
                            style={{ width: '55px', height: '70px' }}
                        />
                        <div className="mt-2 text-white-50">Tài liệu PDF</div>
                    </div>

                    {/* Giá + nút thanh toán */}
                    <div className="text-center">
                        <div className="fs-2 fw-bold mb-2" style={{ color: 'green' }}>{price} $</div>
                        {!hasPurchased ? (
                            <Button className='border-0' style={{ backgroundColor: 'green' }} onClick={handlePayment}>
                                <FaCartShopping className="me-2" />
                                Thanh toán
                            </Button>
                        ) : (
                            <a
                                href={product.file_url}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-success"
                            >
                                Tải file
                            </a>
                        )}
                    </div>
                </div>

                {/* Cột phải: Tiêu đề + mô tả + ngày */}
                <div className="col-md-8 py-3" >
                    <h2 className="mb-3">{title}</h2>
                    <hr />
                    <p className="fst-italic " >{description}</p>
                    <div className="mt-4" style={{ fontSize: '0.8rem' }} >Ngày đăng: {new Date(createdAt).toLocaleDateString()}</div>
                </div>
            </div>
        </div>
    )
};

export default ProductDetail;
