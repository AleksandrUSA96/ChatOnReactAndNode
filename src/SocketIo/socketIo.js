import io from "socket.io-client";

const socket = io('https://chat-on-react-and-node-backend.herokuapp.com');

export default socket;