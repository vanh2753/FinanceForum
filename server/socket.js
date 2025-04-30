const { Server } = require("socket.io");

let io;

const initializeSocket = (httpServer) => {
    io = new Server(httpServer, {
        /* options */
        cors: {
            origin: '*'
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected');

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

const getIO = () => {
    if (!io) throw new Error("Socket.io chưa initialize!");
    return io;
};

module.exports = {
    initializeSocket, getIO
}
