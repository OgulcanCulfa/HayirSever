const { FadabHelper,selectAsync } = require("fadab-mysql-helper");

class UserTransactions extends FadabHelper{
  constructor() {
    super();
    this.baseTable = "tbluser";
    this.vwName = "vwusersforchat";
  }

  vwSelectAsync(options) {
    return selectAsync(this.vwName);
  }
}

module.exports = UserTransactions;
