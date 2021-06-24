const operations = require('../operations/operations');

class CommentTransactions {
    constructor() {
        this.table = "tblcomments",
        this.view = "vwcommentswithusers";
    }

    vwSelect(selectObj) {
        return operations.selectAll(this.view, selectObj);
    }
    delete(deleteObj) {
        return operations.delete(this.table, deleteObj)
    }
    select(selectObj) {
        return operations.findOne(this.table, selectObj);
    }
    insert(insertObj) {
        return operations.insert(this.table, insertObj);
    }
}

module.exports = CommentTransactions;
