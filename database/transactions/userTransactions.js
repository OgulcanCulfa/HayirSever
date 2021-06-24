const { selectAll, findOne, update } = require("../operations/operations");

class UserTransactions {
  constructor() {
    this.table = "tbluser";
    this.view = "vwusersforchat";
  }

  findOne(selectObj) {
    return findOne(this.table, selectObj);
  }

  vwSelect() {
    return selectAll(this.view);
  }

  update(where, updateObj) {
    return update(this.table, where, updateObj);
  }
}

module.exports = UserTransactions;
