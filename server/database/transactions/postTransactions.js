const { FadabHelper,selectAsync,insertAsync } = require("fadab-mysql-helper");

class PostTransactions extends FadabHelper {
  constructor() {
    super();
    this.baseTable = "tblposts";
    this.vwName = "vwpostswithusers";
  }

  vwSelectAsync(options) {
    return selectAsync(this.vwName, options);
  }
}

module.exports = PostTransactions;
