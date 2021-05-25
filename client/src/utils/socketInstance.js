import socketIOClient from "socket.io-client";
import { localhost } from "../environments/index";

export const socket = (id) => {
  return socketIOClient(localhost, {
    query: {
      userId: id,
    },
  });
};
