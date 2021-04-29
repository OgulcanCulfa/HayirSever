const { FadabHelper,selectAsync,insertAsync } = require("fadab-mysql-helper");

class CommentTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblcomments";
    this.vwName = "vwcommentswithusers"
  }

  vwSelectAsync(options) {
    return selectAsync(this.vwName, options);
  }

}

module.exports = CommentTransactions;
