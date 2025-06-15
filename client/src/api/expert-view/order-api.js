import axios from '../axios'

const createOrder = async (productId) => {
    const res = await axios.post(`/orders/${productId}`)
    return res.data
}

const createPaymentUrl = async (orderId) => {
    const res = await axios.post(`/vnpay/create-payment-url/${orderId}`)
    return res.data
}

export { createOrder, createPaymentUrl }