const { FadabHelper, selectAsync, queryAsync } = require("fadab-mysql-helper");

class ChatTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblchat";
    this.vwName = "vwchatwithusers";
  }

  vwSelectAsync(options) {
    return selectAsync(this.vwName, options);
  }

  // getMessages(senderId) {
  //   return queryAsync("SELECT * FROM vwchatwithusers WHERE senderId=? OR userId=?",[senderId,senderId])
  // }

  getMessagesById(senderId,receiverId) {
    return queryAsync(
      "(SELECT * FROM tblchat WHERE senderId=? AND receiverId=?) UNION (SELECT * FROM tblchat WHERE receiverId=? AND senderId=?) ORDER BY createdAt",[senderId,receiverId,senderId,receiverId]
    );
  }
}

module.exports = ChatTransactions;
