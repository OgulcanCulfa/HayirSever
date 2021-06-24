const {
  selectAll,
  deleteRecord,
  findOne,
  insert,
} = require("../operations/operations");

class CommentTransactions {
  constructor() {
    this.table = "tblcomments";
    this.view = "vwcommentswithusers";
  }

  vwSelect(selectObj) {
    return selectAll(this.view, selectObj);
  }
  delete(deleteObj) {
    return deleteRecord(this.table, deleteObj);
  }
  select(selectObj) {
    return findOne(this.table, selectObj);
  }
  insert(insertObj) {
    return insert(this.table, insertObj);
  }
}

module.exports = CommentTransactions;
