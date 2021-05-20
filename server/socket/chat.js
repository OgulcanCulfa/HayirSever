const { getMessages, sendMessage } = require("./transactions");

module.exports = {
  socket: (io) => {
    io.on("connection", async (socket) => {
      const id = await socket.handshake.query.userId;
      socket.broadcast.emit("isOnline", {id, bool: true});
      socket.on("joinPrivate", async ({ senderId, receiverId }) => {
        if (
          io.sockets.adapter.rooms.has(
            receiverId.toString() + senderId.toString()
          )
        ) {
          socket.join(receiverId.toString() + senderId.toString());
        } else {
          socket.join(senderId.toString() + receiverId.toString());
        }
      });
      socket.on("getMessages", async ({ senderId, receiverId }) => {
        const data = await getMessages(senderId, receiverId);
        if (
          io.sockets.adapter.rooms.has(
            receiverId.toString() + senderId.toString()
          )
        ) {
          io.to(receiverId.toString() + senderId.toString()).emit(
            "getMessages",
            data
          );
        } else {
          io.to(senderId.toString() + receiverId.toString()).emit(
            "getMessages",
            data
          );
        }
      });
      socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
        //console.log(senderId.toString() + receiverId.toString());
        const result = await sendMessage(senderId, receiverId, message);
        const data = await getMessages(senderId, receiverId);
        io.to(senderId.toString() + receiverId.toString()).emit(
          "successOrFail",
          result
        );
        io.to(senderId.toString() + receiverId.toString()).emit(
          "getMessages",
          data
        );
      });
      socket.on("disconnect", () => {
        socket.broadcast.emit("isOnline", {id, bool: false});
      });
    });
  },
};