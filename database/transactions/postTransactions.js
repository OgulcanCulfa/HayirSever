const { selectAll, deleteRecord, insert } = require("../operations/operations");

class PostTransactions {
  constructor() {
    this.table = "tblposts";
    this.view = "vwpostswithusers";
  }

  paginatedSelect(selectObj) {
    return operations.customQuery(
      `SELECT * FROM ${this.view} ${
        selectObj.categoryId && "WHERE categoryId=" + selectObj.categoryId
      } LIMIT ${selectObj.limit} OFFSET ${selectObj.offset}`
    );
  }

  vwSelect(selectObj) {
    return selectAll(this.view, selectObj);
  }
  delete(deleteObj) {
    return deleteRecord(this.table, deleteObj);
  }

  insert(insertObj) {
    return insert(this.table, insertObj);
  }
}

module.exports = PostTransactions;
