// socket.js
import { io } from 'socket.io-client';
const domain = import.meta.env.VITE_DOMAIN;
const socket = io(domain, {
    withCredentials: true,
    autoConnect: true,
    transports: ['websocket']
});
window.socket = socket;

export default socket;
