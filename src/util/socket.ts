import { io } from "socket.io-client";

const socket = io("ws://192.168.1.103:7000", {
  transports: ['websocket']
});

export { socket }
