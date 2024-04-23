import express, { Express } from 'express';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app: Express = express();

app.use(express.json());
app.use(cors);

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
    console.log(`api-ws running en el puerto ${port}`)
})

const io: Server = new Server(server, {
    cors: {
        origin:"*"
    }
});

io.on('connection', socket => {
    socket.on('suscribcion payment', subs => {
        console.log('Suscripcion success and sended to client:', subs);
        io.emit('suscribcion payment', subs);
    });
})