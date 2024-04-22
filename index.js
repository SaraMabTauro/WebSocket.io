"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors_1.default);
const port = process.env.PORT || 3005;
const server = app.listen(port, () => {
    console.log(`api-ws running en el puerto ${port}`);
});
const io = new socket_io_1.Server(server, {
    pingTimeout: 60000,
    cors: {
        origin: "*"
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
});
