import express, { Express } from 'express';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(cors);

const port = process.env.PORT || 3005;

const server = app.listen(port, () => {
    console.log(`api-ws running en el puerto ${port}`)
})

const io: Server = new Server(server, {
    pingTimeout: 60000,
    cors: {
        origin:"*"
    }
});

io.on('connection', socket => {
    socket.on('suscripcion', subs => {
        console.log('Suscripcion success and sended to client:', subs);
        io.emit('suscription-processed', subs);
    });

    socket.on('connect_error', (error) => {
        console.error('Error de conexión:', error);
    });

    socket.on('disconnect', (reason) => {
        console.error('Desconectado:', reason);
    });
})