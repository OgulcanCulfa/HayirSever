const ChatTransactions = require("../database/transactions/chatTransactions");
const UserTransactions = require("../database/transactions/userTransactions");
const chatTransactions = new ChatTransactions();
const userTransactions = new UserTransactions();

module.exports = {
  getMessages: async (senderId, receiverId) => {
    const data = await chatTransactions.getMessagesById(senderId, receiverId);
    return data;
  },
  sendMessage: async (senderId, receiverId, message) => {
    const data = await chatTransactions.insert({
      senderId,
      receiverId,
      message,
    });

    if (!data.affectedRows) {
      return false;
    } else {
      return true;
    }
  },
  updateOnlineStatus: async (id) => {
    const result = await userTransactions.update({ id: id }, { isOnline: 1 });
    if (!result.affectedRows) {
      return false;
    } else {
      return true;
    }
  },
  updateOfflineStatus: async (id) => {
    const result = await userTransactions.update({ id: id }, { isOnline: 0 });
    if (!result.affectedRows) {
      return false;
    } else {
      return true;
    }
  },
};
