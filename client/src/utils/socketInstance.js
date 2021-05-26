import socketIOClient from "socket.io-client";
import { heroku } from "../environments/index";

export const socket = (id) => {
  return socketIOClient(heroku, {
    transports: ['websocket'],
    upgrade: false,
    query: {
      userId: id,
    },
  });
};
