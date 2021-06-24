const {
  selectAll,
  update,
  customQuery,
  insert,
} = require("../operations/operations");

class ChatTransactions {
  constructor() {
    this.table = "tblchat";
    this.view = "vwchatwithusers";
  }

  vwSelect(selectObj) {
    return selectAll(this.view, selectObj);
  }

  insert(insertObj) {
    return insert(this.table, insertObj);
  }

  update(where, updateObj) {
    return update(this.table, where, updateObj);
  }

  getMessagesById(senderId, receiverId) {
    return customQuery(
      "(SELECT * FROM tblchat WHERE senderId=? AND receiverId=?) UNION (SELECT * FROM tblchat WHERE receiverId=? AND senderId=?) ORDER BY createdAt",
      [senderId, receiverId, senderId, receiverId]
    );
  }
}

module.exports = ChatTransactions;
