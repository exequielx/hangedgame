import { Server } from 'socket.io'

const SocketHandler = async (req, res) => {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
        io.on('connection', (socket) => {
            console.log('cliente conectado: ' + socket?.id)
            socket.on('picha', (msg) => {
                io.emit('3726', msg);
            });
           
        });
    }
    res.end();
}

export default SocketHandler