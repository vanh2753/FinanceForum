import axios from '../axios'

const createOrder = async (productId) => {
    const res = await axios.post(`/orders/${productId}`)
    return res.data
}

const createPaymentSession = async (orderId, product) => {
    const res = await axios.post(`/payment/create-checkout-session`, { orderId, product })
    return res.data
}

const verifyCheckoutSession = async (session_id) => {
    const res = await axios.get(`/payment/verify-session`, { params: { session_id } })
    return res.data
}

const checkIfPurchased = async (productId) => {
    const res = await axios.get(`/orders/${productId}/check-purchased`)
    return res.data
}


export { createOrder, createPaymentSession, verifyCheckoutSession, checkIfPurchased }