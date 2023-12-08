import { Server } from 'socket.io'
const game= {
    jugadorActual,
    letrasRestantes,
}

const SocketHandler = async (req, res) => {
    if (!res.socket.server.io) {
        const io = new Server(res.socket.server);
        res.socket.server.io = io;
        io.on('connection', (socket) => {
            console.log('cliente conectado: ' + socket?.id)
            socket.on('play', (msg) => {
                io.emit('updateGame', game);
            });
            socket.on('start', (msg) => {
                io.emit('updateGame', game);
            });
        });
    }
    res.end();
}

export default SocketHandler