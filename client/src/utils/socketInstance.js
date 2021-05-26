import socketIOClient from "socket.io-client";
import { localhost } from "../environments/index";

export const socket = (id) => {
  return socketIOClient(localhost, {
    transports: ['websocket'],
    upgrade: false,
    query: {
      userId: id,
    },
  });
};
