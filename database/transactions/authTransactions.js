const { findOne, insert } = require("../operations/operations");

class AuthTransactions {
  constructor() {
    this.table = "tbluser";
  }

  findOne(selectObj) {
    return findOne(this.table, selectObj);
  }

  insert(insertObj) {
    return insert(this.table, insertObj);
  }
}

module.exports = AuthTransactions;
