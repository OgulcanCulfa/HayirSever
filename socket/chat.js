const {
  getMessages,
  sendMessage,
  updateOnlineStatus,
  updateOfflineStatus,
} = require("./transactions");


module.exports = {
  socket: (io) => {
    io.on("connection", async (socket) => {
      const id = await socket.handshake.query.userId;
      const result = await updateOnlineStatus(id);
      await socket.broadcast.emit("online", { id, result });
      socket.on("joinPrivate", async ({ senderId, receiverId }) => {
        if (
          await io.sockets.adapter.rooms.has(
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
          await io.sockets.adapter.rooms.has(
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
      socket.once("disconnect", async () => {
        await updateOfflineStatus(id);
        socket.broadcast.emit("getChatUser");
      });
    });
  },
};
