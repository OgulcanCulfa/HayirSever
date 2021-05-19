const TransactionsFactory = require("../database/transactionFactory");
const chatTransactions = TransactionsFactory.creating("chatTransactions");

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
};
