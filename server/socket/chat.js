const { getMessages, sendMessage } = require("./transactions");

module.exports = {
  socket: (io) => {
    io.on("connection", (socket) => {
      socket.on("getMessages", async ({ senderId, receiverId }) => {
        socket.join(senderId.toString() + receiverId.toString())
        const data = await getMessages(senderId, receiverId);
        io.sockets.to(senderId.toString() + receiverId.toString()).emit("getMessages", data);
      });
      socket.on("sendMessage", async ({ senderId, receiverId, message }) => {
        const result = await sendMessage(senderId, receiverId, message);
        const data = await getMessages(senderId, receiverId);
        io.sockets.to(receiverId.toString() + senderId.toString()).emit("successOrFail", result);
        io.sockets.to(receiverId.toString() + senderId.toString()).emit("getMessages",data);
      });
    });
  },
};
