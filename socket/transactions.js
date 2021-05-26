const TransactionsFactory = require("../database/transactionFactory");
const chatTransactions = TransactionsFactory.creating("chatTransactions");
const userTransactions = TransactionsFactory.creating("userTransactions");

module.exports = {
  getMessages: async (senderId, receiverId) => {
    const data = await chatTransactions.getMessagesById(senderId, receiverId);
    return data;
  },
  sendMessage: async (senderId, receiverId, message) => {
    const data = await chatTransactions.insertAsync({
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
    const result = await userTransactions.updateAsync({isOnline: 1},{id: id});
    if (!result.affectedRows) {
      return false;
    } else {
      return true;
    }
  },
  updateOfflineStatus: async (id) => {
    const result = await userTransactions.updateAsync({isOnline: 0},{id: id});
    if (!result.affectedRows) {
      return false;
    } else {
      return true;
    }
  }
};
