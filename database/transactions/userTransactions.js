const operations = require('../operations/operations');

class UserTransactions {
    constructor() {
        this.table = "tbluser",
        this.view = "vwusersforchat";
    }

    findOne(selectObj) {
        return operations.findOne(this.table, selectObj);
    }

    vwSelect() {
        return operations.selectAll(this.view);
    }

    update(where, updateObj) {
        return operations.update(this.table, where, updateObj);
    }
}

module.exports = UserTransactions;

