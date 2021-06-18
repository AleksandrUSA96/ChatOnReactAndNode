import * as axios from "axios";
import socket from "../../SocketIo/socketIo";

const instance = axios.create({
    baseURL: `https://chat-on-react-and-node-backend.herokuapp.com/`,
});

export const entranceAPI = {
    async sendInformation(info) {
        return await instance.post('entrance', info);
    }
}

export const socketAPI = {
    sendMessage(info) {
        socket.emit('MESSAGE', info);
    },
    setAuth(info) {
        socket.emit('ROOM:AUTH', info);
    },
    setRooms(setRoomInfoHandler) {
        socket.on('ROOM:SET_ROOMS', rooms => setRoomInfoHandler(rooms));
    },
    setMessages(setMessagesHandler) {
        socket.on('ROOM:SET_MESSAGES', messages => setMessagesHandler(messages));
    },
    setMessage(setMessageHandler) {
        socket.on('MESSAGE', message => setMessageHandler(message));
    }
}
